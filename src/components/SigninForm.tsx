"use client";

export function SigninForm() {
  return (
    <div>
      <form>
        <input type="text" placeholder="Username" name="username" />
        <input type="password" placeholder="Password" name="password" />
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
}
