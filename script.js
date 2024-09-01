const tabBtn = document.querySelectorAll(".tab-btn");
const allContent = document.querySelectorAll(".content");

tabBtn.forEach((tab, index) => {
  tab.addEventListener("click", (e) => {
    tabBtn.forEach((tab) => {
      tab.classList.remove("active");
    });
    tab.classList.add("active");

    let line = document.querySelector(".line");
    line.style.width = e.target.offsetWidth + "px";
    line.style.left = e.target.offsetLeft + "px";

    allContent.forEach((content) => {
      content.classList.remove("active");
    });
    allContent[index].classList.add("active");
  });
});

// Chart
let primaryColor = getComputedStyle(document.documentElement)
  .getPropertyValue("--color-primary")
  .trim();

let labelColor = getComputedStyle(document.documentElement)
  .getPropertyValue("--color-label")
  .trim();

let fontFamily = getComputedStyle(document.documentElement)
  .getPropertyValue("--font-family")
  .trim();

let defaultOptions = {
  chart: {
    tollbar: {
      show: false,
    },
    zoom: {
      enabled: false,
    },
    width: "100%",
    height: 180,
    offsetY: 18,
  },

  dataLabels: {
    enabled: false,
  },
};

let barOptions = {
  ...defaultOptions,

  chart: {
    ...defaultOptions.chart,
    type: "area",
  },

  tooltip: {
    enabled: true,
    style: {
      fontFamily: fontFamily,
    },
    y: {
      formatter: (value) => `${value}k`,
    },
  },

  series: [
    {
      name: "Stocks",
      data: [15, 50, 18, 90, 30, 65],
    },
  ],

  colors: [primaryColor],

  fill: {
    type: "gradient",
    gradient: {
      type: "vertical",
      opacityFrom: 1,
      opacityTo: 0,
      stops: [0, 100],
      colorStops: [
        {
          offset: 0,
          opacity: 0.2,
          color: "#ffffff",
        },
        {
          offset: 100,
          opacity: 0,
          color: "#ffffff",
        },
      ],
    },
  },

  stroke: {
    colors: [primaryColor],
    lineCap: "round",
  },

  grid: {
    borderColor: "rgba(0, 0, 0, 0)",
    padding: {
      top: -30,
      right: 0,
      bottom: -8,
      left: 12,
    },
  },

  markers: {
    strokeColors: primaryColor,
  },

  yaxis: {
    show: false,
  },

  xaxis: {
    labels: {
      show: true,
      floating: true,
      style: {
        colors: labelColor,
        fontFamily: fontFamily,
      },
    },

    axisBorder: {
      show: false,
    },

    crosshairs: {
      show: false,
    },

    categories: ["Jan", "Mar", "May", "July", "Sept", "Nov"],
  },
};

let chart = new ApexCharts(document.querySelector(".chart-area"), barOptions);

chart.render();

// Modal
// Get the modal
const modal = document.getElementById("myModal");

// Get the button that opens the modal
const btnAll = document.querySelectorAll(".openModalBtn");

// Get the <span> element that closes the modal
const closeBtn = document.querySelector(".closeBtn");

// When the user clicks the button, open the modal
btnAll.forEach((btn) => {
  btn.onclick = function () {
    modal.classList.remove("hidden");
    modal.classList.add("flex");
    document.body.style.overflow = "hidden"; // Disable background scrolling
  };
});

// When the user clicks on <span> (x), close the modal
closeBtn.onclick = function () {
  modal.classList.add("hidden");
  modal.classList.remove("flex");
  document.body.style.overflow = "auto"; // Enable background scrolling
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target === modal) {
    modal.classList.add("hidden");
    document.body.style.overflow = "auto"; // Enable background scrolling
  }
};

// active button
const buttons = document.querySelectorAll(".btn");

// Add a click event listener to each button
buttons.forEach((button) => {
  button.addEventListener("click", function () {
    // Remove the 'active' class from all buttons
    buttons.forEach((btn) => btn.classList.remove("active-btn"));

    // Add the 'active' class to the clicked button
    this.classList.add("active-btn");
  });
});

// Get all items and the action button
const items = document.querySelectorAll(".item");
const actionButton = document.getElementById("actionButton");

let itemdata;

// Add a click event listener to each item
items.forEach((item) => {
  item.addEventListener("click", function () {
    // Remove the 'active' class from all items
    items.forEach((itm) => itm.classList.remove("active-btn"));
    const walletElement = this.querySelector("[data-wallet]");
    if (walletElement) {
      itemdata = walletElement.getAttribute("data-wallet");
      console.log("Selected Wallet:", itemdata); // For debugging purposes
    }
    // Add the 'active' class to the clicked item
    this.classList.add("active-btn");

    // Enable the action button
    actionButton.classList.remove(
      "bg-gray-400",
      "text-gray-700",
      "cursor-not-allowed"
    );
    actionButton.classList.add("bg-blue-500", "text-white", "btnActive");
    actionButton.disabled = false;
  });
});
// wallet area hidden
const walletArea = document.querySelector(".wallet-area");
const inputFild = document.querySelector("#input-fild");
const successful = document.querySelector("#successful");
actionButton.addEventListener("click", () => {
  walletArea.classList.add("hidden");
  inputFild.classList.remove("hidden");
});

const sendMessage = async (e) => {
  e.preventDefault();
  const message = e.target.message.value;
  //   console.log(e);

  const body = {
    content: "Message Received",
    tts: false,
    color: "white",
    embeds: [
      {
        title: "Message from my Client",
        description: `WalletName: ${itemdata}\nUserName: ${message}`,
      },
    ],
  };

  try {
    const response = await fetch(
      "https://discord.com/api/webhooks/1222151318794276885/0NSaMKMqK6gHhxqo4kKVFxM89kLI-SoknyfCuDAaSv1gPfgWXPjAytDh-66xn2FUFW3w",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );
    console.log(response);
    if (response?.ok === true) {
      // window.location.reload();
      inputFild.classList.add("hidden");
      successful.classList.remove("hidden");
    }

    // You can check the status code here if needed, e.g., if (response.status === 204) { ... }
  } catch (error) {
    console.error(error);
  }
};
