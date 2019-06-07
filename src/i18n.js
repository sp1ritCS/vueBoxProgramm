import Vue from "vue";
import VueI18n from "vue-i18n";

Vue.use(VueI18n);

import local from "@/assets/translation.json";

const messages = {
  ...local
};

export default new VueI18n({
  locale: navigator.language || navigator.userLanguage,
  // locale: "en",
  fallbackLocale: "en",
  messages
});
