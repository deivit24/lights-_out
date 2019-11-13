import React from "react";
import "./Menu.css";

class Menu extends React.Component {
  open() {
    const navBlack = document.querySelector(".nav-black"),
      navRed = document.querySelector(".nav-red"),
      navWhite = document.querySelector(".nav-white"),
      navContainer = document.querySelector(".nav-container");
    // navText = document.querySelector(".nav-text");

    navBlack.classList.add("visible");
    navRed.classList.add("visible");
    navWhite.classList.add("visible");
    navContainer.classList.add("visible");
    // navText.classList.add("visible");
  }
  close() {
    const navBlack = document.querySelector(".nav-black"),
      navRed = document.querySelector(".nav-red"),
      navWhite = document.querySelector(".nav-white"),
      navContainer = document.querySelector(".nav-container");
    // navText = document.querySelector(".nav-text");

    navBlack.classList.remove("visible");
    navRed.classList.remove("visible");
    navWhite.classList.remove("visible");
    navContainer.classList.remove("visible");
    // navText.classList.remove("visible");
  }
  render() {
    return (
      <div>
        <button onClick={this.open} className="nav-button nav-open neon">
          {" "}
          Instructions
        </button>

        <div className="nav nav-black">
          <div className="nav nav-red">
            <div className="nav nav-white">
              <div className="nav-container">
                <button onClick={this.close} className="nav-button nav-close">
                  {" "}
                  <i class="fas fa-times"></i>
                </button>
                <p className="nav-text">
                  Lights Out is a logic/puzzle game, played on a gird of
                  individual lights, which can either be lit or unlit. The
                  puzzle is won when when all of the lights are turned off.
                </p>
                <p className="nav-text">
                  {" "}
                  You can click on a cell to toggle that light — but it also
                  toggles the light above it, to the left of it, to the right of
                  it, and below it. (Cells on an edge or in the corner won’t
                  flip as many lights, since they are missing some neighbors).
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Menu;
