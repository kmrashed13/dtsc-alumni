
document.addEventListener("DOMContentLoaded", function () {

  const form = document.getElementById("adminLoginForm");
  const message = document.getElementById("loginMessage");
  const loginBtn = document.getElementById("loginBtn");

  if (!form || !message || !loginBtn) {
    console.error("Admin login elements not found.");
    return;
  }

  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    const client = window.supabaseClient;

    function showMessage(text, type) {
      message.textContent = text;
      message.className = "message " + type;
    }

    if (!client) {
      showMessage(
        "Supabase connection not found. Check supabase.js and script loading.",
        "error"
      );
      console.error("Supabase client is missing.");
      return;
    }

    loginBtn.disabled = true;
    loginBtn.textContent = "VERIFYING ADMIN...";

    showMessage("Connecting to Supabase...", "loading");

    try {

      // STEP 1: Authenticate User
      const { data, error } = await client.auth.signInWithPassword({
        email: email,
        password: password
      });

      if (error) {
        throw error;
      }

      const user = data.user;

      if (!user) {
        throw new Error("User authentication failed.");
      }

      showMessage("Checking administrator permission...", "loading");

      // STEP 2: Verify Admin Role
      const { data: admin, error: adminError } = await client
        .from("admin_users")
        .select("user_id, role")
        .eq("user_id", user.id)
        .maybeSingle();

      if (adminError) {
        throw new Error(
          "Admin verification failed: " + adminError.message
        );
      }

      // STEP 3: Authorization Check
      if (
        !admin ||
        !["admin", "super_admin"].includes(
          String(admin.role).toLowerCase()
        )
      ) {

        await client.auth.signOut();

        throw new Error(
          "Access denied! You are not an authorized administrator."
        );
      }

      // STEP 4: Successful Login
      showMessage("Login successful! Redirecting...", "success");

      loginBtn.textContent = "LOGIN SUCCESSFUL";

      window.location.replace("../admin/dashboard.html");

    } catch (error) {

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
