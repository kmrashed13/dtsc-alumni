document.addEventListener("DOMContentLoaded", function () {

  const form = document.getElementById("adminLoginForm");
  const message = document.getElementById("loginMessage");
  const loginBtn = document.getElementById("loginBtn");

  if (!form || !message || !loginBtn) return;

  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    message.textContent = "Verifying Admin...";
    message.className = "message loading";
    loginBtn.disabled = true;

    try {
      const client = window.supabaseClient;

      if (!client) {
        throw new Error("Supabase connection not found.");
      }

      // Step 1: Authenticate
      const { data, error } = await client.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;

      const user = data.user;

      if (!user) {
        throw new Error("User not found.");
      }

      // Step 2: Verify Admin Role
      const { data: admin, error: adminError } = await client
        .from("admin_users")
        .select("user_id, role")
        .eq("user_id", user.id)
        .maybeSingle();

      if (adminError) {
        throw new Error("Admin verification failed.");
      }

      // Step 3: Check Authorization
      if (
        !admin ||
        !["admin", "super_admin"].includes(admin.role)
      ) {
        await client.auth.signOut();
        throw new Error("Access denied! Unauthorized Admin.");
      }

      // Step 4: Redirect
      message.textContent = "Login Successful! Redirecting...";
      message.className = "message success";

      window.location.href = "../admin/dashboard.html";

    } catch (error) {

      message.textContent = error.message;
      message.className = "message error";

      loginBtn.disabled = false;
    }

  });

});
