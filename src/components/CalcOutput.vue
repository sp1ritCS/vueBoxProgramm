<template>
  <div id="output">
    <h2>{{ $t("titles.output") }}</h2>
    <h3>
      {{ $t("titles.calcIO.paper") }}
      <font-awesome-icon icon="sticky-note"></font-awesome-icon>
    </h3>
    <div class="inputGroup">
      <label for="outNeeded">{{ $t("calc.output.needed") }}: </label>
      <input
        type="number"
        name="needed"
        id="outNeeded"
        step="any"
        v-model="boxObj.needed"
        disabled
      />cm²
    </div>
    <div class="inputGroup">
      <label for="outActual">{{ $t("calc.output.actual") }}: </label>
      <input
        type="number"
        name="actual"
        id="outActual"
        step="any"
        v-model="boxObj.actual"
        disabled
      />cm²
    </div>
    <div class="inputGroup">
      <label for="outFlute"
        >{{ $tc("calc.output.flute", boxObj.layers.length) }}:
      </label>
      <input
        type="number"
        name="flute"
        id="outFlute"
        step="any"
        v-model="boxObj.flute"
        disabled
      />cm²
    </div>
    <div class="inputGroup">
      <label for="outCorrugated">{{ $t("calc.output.corrugated") }}: </label>
      <input
        type="number"
        name="corrugated"
        id="outCorrugated"
        step="any"
        v-model="boxObj.corrugated"
        disabled
      />cm²
    </div>
    <div class="inputGroup">
      <label for="outCorrugatedAll"
        >{{ $t("calc.output.corrugatedAll") }}:
      </label>
      <input
        type="number"
        name="corrugatedAll"
        id="outCorrugatedAll"
        step="any"
        v-model="all.corrugated"
        disabled
      />cm²
    </div>
    <br />
    <hr />
    <h3>
      {{ $t("titles.calcIO.output.info") }}
      <font-awesome-icon icon="info-circle"></font-awesome-icon>
    </h3>
    <div class="inputGroup">
      <label for="outWeight">{{ $t("calc.output.weight") }}: </label>
      <input
        type="number"
        name="weight"
        id="outWeight"
        step="any"
        v-model="boxObj.weight"
        disabled
      />g
    </div>
    <div class="inputGroup">
      <label for="outPrice">{{ $t("calc.output.price") }}: </label>
      <input
        type="number"
        name="price"
        id="outPrice"
        step="any"
        v-model="boxObj.price"
        disabled
      /><font-awesome-icon icon="euro-sign"></font-awesome-icon>
    </div>
    <div class="inputGroup">
      <label for="outWeight">{{ $t("calc.output.weightAll") }}: </label>
      <input
        type="number"
        name="weight"
        id="outWeight"
        step="any"
        v-model="all.weight"
        disabled
      />g
    </div>
    <div class="inputGroup">
      <label for="outPrice">{{ $t("calc.output.priceAll") }}: </label>
      <input
        type="number"
        name="price"
        id="outPrice"
        step="any"
        v-model="all.price"
        disabled
      /><font-awesome-icon icon="euro-sign"></font-awesome-icon>
    </div>
    <h3>
      {{ $t("titles.calcIO.output.download") }}
      <font-awesome-icon icon="file-download"></font-awesome-icon>
    </h3>
    <div class="gridDown">
      <!-- <button :data-con='$t("calc.output.downloadBtn") + " ⬇"' class="buttonDown" title="Click me for free Virus!" v-tippy="{ placement : 'top',  arrow: true }" v-on:click="downloadQueue()"></button> -->
      <div><font-awesome-icon icon="file"></font-awesome-icon><br />.json</div>
      <div>
        <font-awesome-icon icon="file-alt"></font-awesome-icon><br />.xml
      </div>
      <div class="pseudoLink">
        <span v-on:click="downloadJson()">Download</span>
      </div>
      <div class="pseudoLink">
        <span v-on:click="downloadXml()">Download</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#output {
  border-left: 2px solid var(--text);
  margin-left: 1rem;
  padding: 0 1rem;
}

.inputGroup {
  padding: 0.5rem 0;
  label {
    margin-right: 0.125rem;
  }
  input[type="number"] {
    padding: 0.5rem;
    &[disabled] {
      background-color: #ddd;
      color: var(--text);
      border: none;
      border: 1px solid var(--text);
      font-size: 12pt;
      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
      -moz-appearance: textfield;
    }
  }
}

.gridDown {
  margin-top: 1rem;

  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-template-areas: ". ." ". .";
  .pseudoLink {
    span {
      color: var(--text);
      transition: color 0.25s ease-in-out;
      cursor: pointer;
      &:hover {
        color: var(--primary);
      }
    }
  }
}

// $s: 10px;
// .buttonDown {
//   display: inline-block;
//   margin: auto;
//   width: $s*40;
//   height: $s*8;
//   border: none;
//   background: var(--primary);
//   position: relative;
//   overflow: hidden;
//   margin: 0 1rem;
//   margin-top: 0.5rem;
//   box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
//   &:before {
//       content: '';
//       background: darken(#0469d3, 10%);
//       width: $s*80;
//       height: $s*60;
//       position: absolute;
//       transform: translate($s*-100,$s*-40) rotate(130deg);
//       transition: all 700ms ease;
//   }
//   &:after {
//     content: attr(data-con);
//     color: white;
//     font-size: 3em;
//     position: relative;
//     z-index: 100;
//     transition: all 200ms ease;
//     // font-weight: 200;
//   }

//   &:hover {
//     &:after {
//       font-size: 3.2em;
//     }
//     &:before {
//       transform: translate($s*-20,$s*-40) rotate(130deg);
//     }
//   }
// }
</style>

<script>
import store from "@/store";

export default {
  name: "CalcOutput",
  computed: {
    boxObj() {
      return store.state.box;
    },
    all() {
      return {
        corrugated: this.boxObj.corrugated * this.boxObj.amount,
        weight: this.boxObj.weight * this.boxObj.amount,
        price: this.boxObj.price * this.boxObj.amount
      };
    }
  },
  methods: {
    sleep: function(milliseconds) {
      return new Promise(resolve => setTimeout(resolve, milliseconds));
    },
    downloadFile: function(filename, text, type) {
      var element = document.createElement("a");
      element.setAttribute(
        "href",
        `data:text/${type};charset=utf-8,` + encodeURIComponent(text)
      );
      element.setAttribute("download", filename);

      element.style.display = "none";
      document.body.appendChild(element);

      element.click();

      document.body.removeChild(element);
    },
    objectToXml: function(obj) {
      var xml = "";

      for (var prop in obj) {
        if (!obj.hasOwnProperty(prop)) {
          continue;
        }

        if (obj[prop] == undefined) continue;

        xml += "<" + prop + ">";
        if (typeof obj[prop] == "object")
          xml += this.objectToXml(new Object(obj[prop]));
        else xml += obj[prop];

        xml += "</" + prop + ">";
      }

      return xml;
    },
    downloadJson: async function() {
      this.$notify({
        group: "default",
        title: this.$t("notifications.file.convert.title"),
        text: this.$t("notifications.file.convert.body", { ext: "json" })
      });
      await this.sleep(3000);
      this.downloadFile("boxEl.json", JSON.stringify(store.state), "json");
      this.$notify({
        group: "default",
        title: this.$t("notifications.file.success.title"),
        text: this.$t("notifications.file.success.body"),
        type: "success",
        duration: 7500
      });
    },
    downloadXml: async function() {
      this.$notify({
        group: "default",
        title: this.$t("notifications.file.convert.title"),
        text: this.$t("notifications.file.convert.body", { ext: "xml" })
      });
      await this.sleep(3000);
      this.downloadFile("boxEl.xml", this.objectToXml(store.state), "xml");
      this.$notify({
        group: "default",
        title: this.$t("notifications.file.success.title"),
        text: this.$t("notifications.file.success.body"),
        type: "success",
        duration: 7500
      });
    }
  }
};
</script>
