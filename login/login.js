
// Admin Login - DTSC Alumni Association

document.addEventListener("DOMContentLoaded", function () {

  const form = document.getElementById("adminLoginForm");
  const message = document.getElementById("loginMessage");
  const loginBtn = document.getElementById("loginBtn");

  if (!form) return;

  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    message.textContent = "Please wait...";
    loginBtn.disabled = true;

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    try {
      if (!window.supabaseClient) {
        throw new Error("Supabase client পাওয়া যায়নি।");
      }

      const { data, error } =
        await window.supabaseClient.auth.signInWithPassword({
          email: email,
          password: password
        });

      if (error) throw error;

      if (!data.user) {
        throw new Error("User information পাওয়া যায়নি।");
      }

      message.textContent = "Login successful!";

      window.location.href = "../admin/dashboard.html";

    } catch (error) {
      message.textContent = error.message;
      loginBtn.disabled = false;
    }
  });

});
