import React from "react";
import BMC from "./BuyMeACoffee";

export default function () {
  return (
    <>
      <BMC />
      <div className="wrap-960 game-content-useage-notice">
        Special thanks to everyone who makes their build orders publicly
        available!{" "}
        <span role="img" aria-label="heart">
          ❤️
        </span>{" "}
        The source for this app is available on{" "}
        <a
          href="https://github.com/Rahien/aoe2-build-orders"
          target="_blank"
          rel="noopener noreferrer"
        >
          github
        </a>
      </div>
      <div className="wrap-960 game-content-useage-notice">
        Age of Empires II: HD© and Age of Empires II: Definitive Edition©
        Microsoft Corporation. AoE2-profile was created under Microsoft's{" "}
        <a
          href="https://www.xbox.com/en-US/developers/rules"
          target="_blank"
          rel="noopener noreferrer"
        >
          "Game Content Usage Rules"
        </a>{" "}
        using assets from Age of Empires II: Definitive Edition, and it is not
        endorsed by or affiliated with Microsoft.
      </div>
    </>
  );
}
