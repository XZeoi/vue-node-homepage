import Vue from 'vue'
import { 
  // Container 布局容器
  Container,
  Aside,
  Menu,
  Submenu,
  MenuItemGroup,
  MenuItem,
  Header,
  Main,
  Input,
  Button,

  Message, MessageBox
 } from 'element-ui'

Vue.use(Container)
Vue.use(Aside)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItemGroup)
Vue.use(MenuItem)

Vue.use(Header)
Vue.use(Main)

Vue.use(Input)
Vue.use(Button)

Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm