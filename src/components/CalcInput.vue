<template>
  <form>
    <h2>{{ $t("titles.input") }}</h2>
    <h3>
      {{ $t("titles.calcIO.input.box") }}
      <font-awesome-icon icon="box"></font-awesome-icon>
    </h3>
    <div class="inputGroup">
      <label for="inFefco">{{ $t("calc.input.type") }}: </label>
      <select name="fefco" id="inFefco" v-model="fefco">
        <option value="200">Fefco 200</option>
        <option value="201">Fefco 201</option>
      </select>
    </div>
    <div class="inputGroup">
      <label for="inWidth">{{ $t("calc.input.lenght") }} </label>
      <input
        type="number"
        name="width"
        id="inWidth"
        v-model="width"
        step="any"
      />mm
    </div>
    <div class="inputGroup">
      <label for="inDeep">{{ $t("calc.input.deep") }} </label>
      <input
        type="number"
        name="deep"
        id="inDeep"
        v-model="deep"
        step="any"
      />mm
    </div>
    <div class="inputGroup">
      <label for="inHeight">{{ $t("calc.input.height") }} </label>
      <input
        type="number"
        name="height"
        id="inHeight"
        v-model="height"
        step="any"
      />mm
    </div>
    <h3>
      {{ $t("titles.calcIO.input.layers") }}
      <font-awesome-icon icon="layer-group"></font-awesome-icon>
    </h3>
    <div class="inputGroup">
      <label for="inCal0">{{ $t("calc.input.thickness", { num: 1 }) }}: </label>
      <select name="caliper0" id="inCal0" v-model="caliper0">
        <option value="0" disabled>None</option>
        <option value="A">A</option>
        <option value="B">B</option>
        <option value="C">C</option>
        <option value="E">E</option>
        <option value="F">F</option>
      </select>
    </div>
    <div class="inputGroup">
      <label for="inCal1">{{ $t("calc.input.thickness", { num: 2 }) }}: </label>
      <select name="caliper1" id="inCal1" v-model="caliper1">
        <option value="0">None</option>
        <option value="A">A</option>
        <option value="B">B</option>
        <option value="C">C</option>
        <option value="E">E</option>
        <option value="F">F</option>
      </select>
    </div>
    <div class="inputGroup">
      <label for="inCal2">{{ $t("calc.input.thickness", { num: 3 }) }}: </label>
      <select name="caliper2" id="inCal2" v-model="caliper2">
        <option value="0">None</option>
        <option value="A">A</option>
        <option value="B">B</option>
        <option value="C">C</option>
        <option value="E">E</option>
        <option value="F">F</option>
      </select>
    </div>
    <br />
    <div class="inputGroup">
      <label for="inL">{{ $t("calc.input.flap") }}</label>
      <input type="number" name="lesh" id="inL" v-model="flap" step="any" />mm
    </div>
    <br />
    <div class="inputGroup">
      <label for="inAmount">{{ $t("calc.input.amount") }}</label>
      <input
        type="number"
        name="amount"
        id="inAmount"
        v-model="amount"
        step="1"
      />x
    </div>
    <h3>
      {{ $t("titles.calcIO.paper") }}
      <font-awesome-icon icon="sticky-note"></font-awesome-icon>
    </h3>
    <div class="inputGroup">
      <label for="inPaperG">{{ $t("calc.input.paperG") }} </label>
      <input
        type="number"
        name="paperG"
        id="inPaperG"
        v-model="paperG"
        step="any"
      />g/m²
    </div>
    <div class="inputGroup">
      <label for="inPaperType">{{ $t("calc.input.paper") }}: </label>
      <select name="paperType" id="PaperType" v-model="paperType">
        <option
          v-for="(paper, index) in papers.type"
          :key="`paper-${index}`"
          v-bind:value="`${index}`"
          >{{ paper.name }}</option
        >
      </select>
    </div>
    <!-- <br />
    <hr />
    <br />
    Der Bogen hat eine Fläche von
    {{ calculate().needed }}cm²<br />
    Der Karton hat eine tatsächliche Fläche von
    {{ calculate().actual }}cm²<br />
    Die Welle braucht eine Fläche von {{ calculate().flute }}cm²<br />
    Die Wellpaper hat eine Papierfläche von {{ calculate().corrugated }}cm² -->
    <div class="hidden">
      <!-- Nur hier, damit `this.vm` den errechneten Wert in den VueX Store gibt.  -->
      {{ calculate() }}
    </div>
  </form>
</template>

<style lang="scss" scoped>
.inputGroup {
  padding: 0.5rem 0;
  label {
    margin-right: 0.125rem;
  }
  input[type="number"] {
    padding: 0.5rem;
  }
}

.hidden {
  display: none;
}
</style>

<script>
import store from "@/store";
import { corrugated, paper } from "@/assets/fefco.json";

export default {
  name: "CalcInput",
  data() {
    return {
      //width: store.state.box.width
      width: 0.0,
      deep: 0.0,
      height: 0.0,
      caliper0: "A",
      caliper1: "0",
      caliper2: "0",
      flap: 0.0,
      amount: 1,
      paperG: 0.0,
      paperType: 0,
      papers: paper,
      fefco: 200,
      debug: "0",
      debug2: "1"
    };
  },
  methods: {
    calculate: function() {
      switch (parseInt(this.fefco)) {
        case 200:
          return this.fefco200();
        case 201:
          return this.fefco201();
      }
    },
    autoReturn: function(boxObj) {
      store.state.box = boxObj;
      this.saveData();
      return boxObj;
    },
    saveData: function() {
      store.state.info = {
        box: {
          type: this.fefco,
          width: this.width,
          deep: this.deep,
          height: this.height
        },
        layers: this.getFlutes(),
        flap: this.flap,
        amount: this.amount,
        paper: {
          paperG: this.paperG,
          paperType: this.paperType,
          papers: this.papers
        }
      };
    },
    calcFlute: function(nonFlute) {
      var ft = 0;
      const flutes = this.getFlutes();
      flutes.forEach(flute => {
        ft += nonFlute * corrugated[flute].feed;
      });
      return ft;
      //return nonFlute * corrugated[this.caliper0].feed;
    },
    getFlutes: function() {
      var calipers = [this.caliper0, this.caliper1, this.caliper2];
      return calipers.filter(fl => fl !== "0");
    },
    calcFlHeight: function(flutes) {
      var res = 0;
      flutes.forEach(flute => {
        res += corrugated[flute].height;
      });
      return res;
    },
    calcCorHeight: function() {
      const flutes = this.getFlutes();
      var res = (flutes.length + 1) * this.paperHeight;
      res += this.calcFlHeight(flutes);
      return parseFloat(res);
    },
    weight: function(smm) {
      const sqm = parseFloat(smm) / 1e6;
      return sqm * parseFloat(this.paperG);
    },
    fefco200: function() {
      var upperPt = this.boxSide + parseFloat(this.flap);
      var lowerPt = this.boxSide - this.calcCorHeight() * 3;
      var needed = upperPt * (this.height * 1.5);
      var m2 = (lowerPt * (this.height / 2) + upperPt * this.height) / 100;
      var corrugated = this.calcFlute(needed) + needed * 2;
      var weight = this.weight(corrugated);

      return this.autoReturn({
        type: 200,
        needed: needed / 100,
        actual: m2,
        flute: this.calcFlute(needed) / 100,
        corrugated: corrugated / 100,
        weight: weight,
        price: weight * (paper.type[parseInt(this.paperType)].price / 1e6),
        amount: this.amount,
        layers: this.getFlutes()
      });
    },
    fefco201: function() {
      var upperPt = this.boxSide + parseFloat(this.flap);
      var lowerPt = this.boxSide - this.calcCorHeight() * 3;
      var needed = upperPt * this.height * 2;
      var m2 = (lowerPt * this.height + upperPt * this.height) / 100;
      var corrugated = this.calcFlute(needed) + needed * 2;
      var weight = this.weight(corrugated);

      return this.autoReturn({
        type: 201,
        needed: needed / 100,
        actual: m2,
        flute: this.calcFlute(needed) / 100,
        corrugated: corrugated / 100,
        weight: weight,
        price: weight * (paper.type[parseInt(this.paperType)].price / 1e6),
        amount: this.amount,
        layers: this.getFlutes()
      });
    }
  },
  computed: {
    boxSide() {
      return this.width * 2 + this.deep * 2;
    },
    paperHeight() {
      return parseFloat(this.paperG) / 1000;
    }
  }
};
</script>
