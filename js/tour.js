AFRAME.registerComponent("tour", {
    schema: {
      state: { type: "string", default: "places-list" },
      selectedPlace: { type: "string", default: "#card1" },
      zoomAspectRatio: { type: "number", default: 1 }
    },
    init: function() {
      this.placesContainer = this.el;
      this.cameraEl = document.querySelector("#camera");
      this.createPlace();
    },
    tick: function() {
      const { state } = this.el.getAttribute("tour");
  
      if (state === "view") {
        this.hideEl([this.placesContainer]);
        this.showView();
      }
    },
    hideEl: function(elList) {
      elList.map(el => {
        el.setAttribute("visible", false);
      });
    },
    createPlace: function() {
      const details = {
        garden: {
          position: { x: 60, y: 34, z: -100 },
          rotation: { x: 0, y: 0, z: 0 },
          src: "./assets/thumbnails/garden.webp",
          title: "Garden",
          id: "garden"
        },
        main_gate: {
          position: { x: 0, y: 34, z: -100 },
          rotation: { x: 0, y: 0, z: 0 },
          src: "./assets/thumbnails/main_gate.png",
          title: "Main Gate",
          id: "main_gate"
        },
        home: {
          position: { x: -60, y: 34, z: -100 },
          rotation: { x: 0, y: 0, z: 0 },
          src: "./assets/thumbnails/home.jpeg",
          title: "My Home",
          id: "home"
        }
      };
  
      for(var key in details) {
        const item = details[key];
        // Thubnail Element
        const thumbnail = this.createThumbnail(item);
        // Title
        const title = this.createTitleEl(item);
        thumbnail.appendChild(title);
        this.placesContainer.appendChild(thumbnail);
      }
    },
  
    createThumbnail: function(item) {
      const entityEl = document.createElement("a-entity");
      const id = `place-${item.id}`;
      entityEl.setAttribute("visible", true);
      entityEl.setAttribute("id", id);
      entityEl.setAttribute("geometry", {
        primitive: "circle",
        radius: 20
      });
      entityEl.setAttribute("position", item.position);
      entityEl.setAttribute("rotation", item.rotation);
      entityEl.setAttribute("material", { src: item.src, opacity: 0.6 });
      entityEl.setAttribute("cursor-listener", {});
      return entityEl;
    },
    createTitleEl: function(item) {
      const entityEl = document.createElement("a-entity");
      const id = `title-${item.id}`;
      entityEl.setAttribute("text", {
        font: "exo2bold",
        align: "center",
        width: 200,
        color: "red",
        value: item.title
      });
      const position = { x: 0, y: -30, z: 0 };
      entityEl.setAttribute("position", position);
  
      if (item.title === "Main Gate") {
        entityEl.setAttribute("rotation", { x: 180, y: 180, z: 180 });
        entityEl.setAttribute("position", { x: 0, y: -30, z: 0 });
      }
      entityEl.setAttribute("visible", true);
      return entityEl;
    },
    showView: function() {
      const { selectedPlace } = this.data;
      const skyEl = document.querySelector("#main-container");
      skyEl.setAttribute("material", {
        src: `./assets/360_images/${selectedPlace}.jpg`,
        color: "blue"
      });
    },
    update: function() {
      window.addEventListener("keydown", e => {
        if (e.key === "ArrowUp") {
          if (this.data.zoomAspectRatio <= 10) {
            this.data.zoomAspectRatio += 0.002;
            this.cameraEl.setAttribute("zoom", this.data.zoomAspectRatio);
          }
        }
        if (e.key === "ArrowDown") {
          if (this.data.zoomAspectRatio > 1) {
            this.data.zoomAspectRatio -= 0.002;
            this.cameraEl.setAttribute("zoom", this.data.zoomAspectRatio);
          }
        }
      });
    }
  });
