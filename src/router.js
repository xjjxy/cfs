
import login from "./page/ui/login"
import donor_register from "./page/ui/donor_register"
import foundation_register from "./page/ui/foundation_register"
import user_home from "./page/content/user/user_home"
import user_news from "./page/content/user/user_news"
import user_publicInfo from "./page/content/user/user_publicInfo"
import user_qa from "./page/content/user/user_q&a"
import foundation_home from "./page/content/foundation/foundation_home"
import foundation_myProjects from "./page/content/foundation/foundation_myProjects"
import foundation_addProject from "./page/content/foundation/foundation_addProject"
import foundation_qa from "./page/content/foundation/foundation_q&a"
import admin_home from "./page/content/admin/admin_home"
import admin_foundation from "./page/content/admin/admin_foundation"
import admin_projects from "./page/content/admin/admin_projects"
import admin_other from "./page/content/admin/admin_other"
import walletInfo from "./page/content/walletInfo"
import createWallet from "./page/content/createWallet"

export default [
  { path: '/login', name: 'login', component: login },
  { path: '/donor_register', name: 'donor_register', component: donor_register },
  { path: '/foundation_register', name: 'foundation_register', component: foundation_register },
  { path: '/user/user_home', name: 'user_home', component: user_home },
  { path: '/user/user_news', name: 'user_news', component: user_news },
  { path: '/user/user_publicInfo', name: 'user_publicInfo', component: user_publicInfo },
  { path: '/user/user_qa', name: 'user_qa', component: user_qa },
  { path: '/foundation/foundation_home', name: 'foundation_home', component: foundation_home },
  { path: '/foundation/foundation_myProjects', name: 'foundation_myProjects', component: foundation_myProjects },
  { path: '/foundation/foundation_addProject', name: 'foundation_addProject', component: foundation_addProject },
  { path: '/foundation/foundation_qa', name: 'foundation_qa', component: foundation_qa },
  { path: '/admin/admin_home', name: 'admin_home', component: admin_home },
  { path: '/admin/admin_foundation', name: 'admin_foundation', component: admin_foundation },
  { path: '/admin/admin_projects', name: 'admin_projects', component: admin_projects },
  { path: '/admin/admin_other', name: 'admin_other', component: admin_other },
  { path: '/walletInfo', name: 'walletInfo', component: walletInfo },
  { path: '/createWallet', name: 'createWallet', component: createWallet },
]
