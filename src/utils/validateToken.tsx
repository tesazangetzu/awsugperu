import jwt_decode from "jwt-decode";

interface IToken {
  r: string;
  exp: number;
}

const isUserAuthenticated = () => {
  const userToken = localStorage.getItem("user");

  if (userToken) {
    const token = jwt_decode<IToken>(userToken);
    localStorage.setItem("exp", `${token.exp}`);
    localStorage.setItem("role", token.r);
  }
};
export default isUserAuthenticated;
