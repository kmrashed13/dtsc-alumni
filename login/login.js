
document.addEventListener("DOMContentLoaded", function () {

  const form = document.getElementById("adminLoginForm");
  const message = document.getElementById("loginMessage");
  const loginBtn = document.getElementById("loginBtn");

  if (!form || !message || !loginBtn) {
    console.error("Admin login elements not found.");
    return;
  }

  function showMessage(text, type) {
    message.textContent = text;
    message.className = "message " + type;
  }

  form.addEventListener("submit", async function (event) {

    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    const client = window.supabaseClient;

    if (!client) {
      showMessage("Supabase connection not found. Check configuration.", "error");
      return;
    }

    loginBtn.disabled = true;
    loginBtn.textContent = "VERIFYING ADMIN...";

    showMessage("Authenticating...", "loading");

    try {

      // STEP 1: Authenticate
      const { data, error } = await client.auth.signInWithPassword({
        email: email,
        password: password
      });

      if (error) throw error;

      if (!data.user) {
        throw new Error("User authentication failed.");
      }

      const user = data.user;

      // STEP 2: Verify Admin
      showMessage("Checking administrator permission...", "loading");

      const { data: admin, error: adminError } = await client
        .from("admin_users")
        .select("user_id, role")
        .eq("user_id", user.id)
        .maybeSingle();

      if (adminError) {
        throw new Error("Admin verification failed: " + adminError.message);
      }

      // STEP 3: Check Role
      const allowedRoles = ["admin", "super_admin"];

      if (
        !admin ||
        !allowedRoles.includes(String(admin.role).toLowerCase())
      ) {

        await client.auth.signOut();

        throw new Error(
          "Access denied! Unauthorized administrator."
        );
      }

      // STEP 4: Success
      showMessage("Login successful! Redirecting...", "success");

      loginBtn.textContent = "LOGIN SUCCESSFUL";

      window.location.replace("../admin/dashboard.html");

    } catch (error) {

     const unauthMsg = document.getElementById("unauthorized-msg");

// পেজ লোড বা নতুন করে চেষ্টা করার সময় শুরুতে লুকানো থাকবে
if (unauthMsg) {
  unauthMsg.style.display = "none";
}

// লগইন ব্যর্থ হলে (catch ব্লক বা loginError অবস্থায়) এটি দেখান:
if (unauthMsg) {
  unauthMsg.style.display = "block";
}
   console.error("Admin Login Error:", error);

      showMessage(
        error.message || "Something went wrong. Please try again.",
        "error"
      );

      loginBtn.disabled = false;
      loginBtn.textContent = "SECURE ADMIN LOGIN →";

    }

  });

});
