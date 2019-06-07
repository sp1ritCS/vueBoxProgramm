import Vue from "vue";
//import Notifications from 'vue-notification'
import VueTippy from "vue-tippy";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
library.add(fas);
library.add(far);
library.add(fab);
Vue.component("font-awesome-icon", FontAwesomeIcon);

//Vue.use(Notifications)
Vue.use(VueTippy);

export default {};
