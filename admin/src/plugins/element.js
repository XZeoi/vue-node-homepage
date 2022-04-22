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

  Message, MessageBox,

  Table,
  Form, FormItem, Select, Option, Row, Col, DatePicker, TableColumn, Upload, Dialog, Card, Switch
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

// Vue.use(Dialog)

Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Select)
Vue.use(Option)
Vue.use(Row)
Vue.use(Col)

Vue.use(DatePicker)

Vue.use(Upload)
Vue.use(Dialog)

Vue.use(Card)
Vue.use(Switch)







Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm