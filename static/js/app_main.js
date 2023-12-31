document.write(
  '<script async src="https://tally.so/widgets/embed.js"></script>' +
  '<script src="https://cdnjs.cloudflare.com/ajax/libs/mobile-detect/1.4.5/mobile-detect.min.js"></script>'
);

window.addEventListener("load", function () {
  const host = window.location.host;
  if (host == "in10s.co" || host == "www.in10s.co") {
    const toggleBtn = document.querySelector(".menuToggleBtn");
    const header = document.querySelector(".header");

    toggleBtn.addEventListener("click", () => {
      header.classList.toggle("headerOpen");
      toggleBtn.classList.toggle("buttonIconNav");
      toggleBtn.classList.toggle("buttonIconClose");
    });
  }
});

function goPage(link) {
  const url_pathname = window.location.pathname + "";
  if (link.substring(0, 1) == "/") {
    link = "https://www.in10s.co" + link;
  }

  gtag("event", "go_page", {
    "event_ category": url_pathname,
    event_label: link.replace("https://www.in10s.co", ""),
  });

  location.href = link;
}

function clickBtn(tag) {
  const url_pathname = window.location.pathname + "";

  gtag("event", "btn_click", {
    "event_ category": url_pathname,
    event_label: tag,
  });
}

function openTally(tag, mode, link) {
  const url_pathname = window.location.pathname + "";
  const device = new MobileDetect(navigator.userAgent);
  gtag("event", "regist_openTally", {
    "event_ category": url_pathname,
    event_label: tag,
  });

  Tally.openPopup("3NlXpN", {
    layout: "modal",
    width: 400,
    hideTitle: false,
    hiddenFields: {
      from: url_pathname,
      tag:
        "{tag: " +
        tag +
        "," +
        "mobile: " +
        device.mobile() +
        ",phone: " +
        device.phone() +
        ",tablet: " +
        device.tablet() +
        ",userAgent: " +
        device.userAgent() +
        ",mobileOs: " +
        device.os() +
        ",pcOs: " +
        navigator.platform +
        "}",
    },
    onOpen: () => {
      // The popup was opened, mark the form as seen
      const tally_popup = document.querySelector(".tally-popup iframe");
      if (link && mode == "page") {
        tally_popup.src =
          "javascript:goPage(https://www.in10s.co/service/acceptancerate/" +
          link +
          "')";
        setTimeout(() => {
          var popup_display = setInterval(() => {
            if (tally_popup.readyState == "complete") {
              tally_popup.style.display = "flex";
              clearInterval(popup_display);
            }
          }, 100);
        }, 300);
      } else {
        tally_popup.style.display = "flex";
      }
    },
    onClose: () => {
      // The popup was closed
      // document.querySelector(".cta").style.display = 'flex';
    },
    onSubmit: (payload) => {
      // Form was submitted, use the answers payload in your application
      //window.open("https://bit.ly/purchase_15000", "", "_blank");
      if (link && mode == "pay") {
        window.open("https://qr.kakaopay.com/" + link, "", "_blank");
      }
    },
  });
}

// Microsoft Clarity
(function (c, l, a, r, i, t, y) {
  c[a] =
    c[a] ||
    function () {
      (c[a].q = c[a].q || []).push(arguments);
    };
  t = l.createElement(r);
  t.async = 1;
  t.src = "https://www.clarity.ms/tag/" + i + "?ref=bwt";
  y = l.getElementsByTagName(r)[0];
  y.parentNode.insertBefore(t, y);
})(window, document, "clarity", "script", "iusk7x1q7r");
