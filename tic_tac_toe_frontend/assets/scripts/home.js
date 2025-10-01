(function () {
  "use strict";

  // PUBLIC_INTERFACE
  /**
   * Initialize the Home screen behaviors:
   * - Wire up CTA button clicks with placeholders.
   * - Add hover preview for board tiles showing alternating X/O.
   * - Update footer year.
   */
  function initHome() {
    /** Accessibility: set current year in footer. */
    var yearEl = document.getElementById("year");
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }

    /** Buttons */
    var btnCpu = document.getElementById("btn-vs-cpu");
    var btnFriend = document.getElementById("btn-vs-friend");
    var btnHowto = document.getElementById("btn-howto");
    var btnHowtoTop = document.querySelector(".howto-top");

    if (btnCpu) {
      btnCpu.addEventListener("click", function () {
        console.log("[Home] Play vs Computer clicked");
        announce("Starting a game vs Computer...");
      });
    }
    if (btnFriend) {
      btnFriend.addEventListener("click", function () {
        console.log("[Home] Play with Friend clicked");
        announce("Starting a game with a friend...");
      });
    }
    if (btnHowto) {
      btnHowto.addEventListener("click", function () {
        console.log("[Home] How to Play clicked");
        showHowTo();
      });
    }
    if (btnHowtoTop) {
      btnHowtoTop.addEventListener("click", function () {
        console.log("[Home] Header How to Play clicked");
        showHowTo();
      });
    }

    /** Board tile hover preview */
    var tiles = Array.prototype.slice.call(document.querySelectorAll(".board-preview .tile"));
    var hoverToggle = true; // alternate X and O for demo
    tiles.forEach(function (tile, index) {
      // For keyboard users, simulate hover on focus.
      tile.addEventListener("mouseenter", function () {
        previewMark(tile);
      });
      tile.addEventListener("mouseleave", function () {
        clearPreview(tile);
      });
      tile.addEventListener("focus", function () {
        previewMark(tile);
      });
      tile.addEventListener("blur", function () {
        clearPreview(tile);
      });

      // Click just logs for now
      tile.addEventListener("click", function () {
        console.log("[Home] Tile clicked:", index + 1);
      });
    });

    function previewMark(tile) {
      // Don't override actual moves (not applicable in preview, but future safe)
      if (tile.dataset.locked === "true") return;

      tile.textContent = hoverToggle ? "X" : "O";
      tile.style.color = hoverToggle ? "#2563EB" : "#F59E0B"; // Ocean Professional accents
      hoverToggle = !hoverToggle;
    }

    function clearPreview(tile) {
      if (tile.dataset.locked === "true") return;
      tile.textContent = "";
      tile.style.color = "";
    }

    // Simple ARIA live region feedback using the status text element in the card
    function announce(message) {
      var status = document.getElementById("status-text");
      if (status) {
        status.textContent = message;
      }
    }

    // Mock "how to play" guidance
    function showHowTo() {
      var message = "How to Play: Get 3 in a row (horizontal, vertical, or diagonal). X goes first!";
      alert(message);
    }
  }

  // Initialize when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initHome);
  } else {
    initHome();
  }
})();
