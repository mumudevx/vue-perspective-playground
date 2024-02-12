const app = Vue.createApp({
  data() {
    return {
      perspective: 100,
      rotateX: 0,
      rotateY: 0,
      rotateZ: 0,
      isCopied: false,
      clipboardText: "",
    };
  },
  computed: {
    box() {
      return {
        transform: `
            perspective(${this.perspective}px)
            rotateX(${this.rotateX}deg)
            rotateY(${this.rotateY}deg)
            rotateZ(${this.rotateZ}deg)
        `,
      };
    },
  },
  methods: {
    reset() {
      this.perspective = 100;
      this.rotateX = 0;
      this.rotateY = 0;
      this.rotateZ = 0;
    },
    copy() {
      this.changeStyle();
      const element = document.createElement("textarea");
      element.value = `transform: perspective(${this.perspective}px) rotateX(${this.rotateX}deg) rotateY(${this.rotateY}deg) rotateZ(${this.rotateZ}deg)`;

      navigator.clipboard.writeText(element.value);
      navigator.clipboard
        .readText()
        .then((value) => (this.clipboardText = value));
    },
    changeStyle() {
      document.body.style.background = "#151531";
      this.isCopied = true;
    },
    resetStyle() {
      document.body.style.background = "#261c33";
      this.isCopied = false;
    },
  },
  watch: {
    isCopied() {
      setTimeout(() => {
        this.resetStyle();
      }, 2500);
    },
  },
});

app.mount("#app");
