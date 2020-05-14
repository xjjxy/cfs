
import login from "./page/ui/login"
import donor_register from "./page/ui/donor_register"
import foundation_register from "./page/ui/foundation_register"
import walletInfo from "./page/content/walletInfo"
import createWallet from "./page/content/createWallet"
import user_home from "./page/content/user/user_home"
import user_projectDetail from "./page/content/user/user_projectDetail"
import user_donate from "./page/content/user/user_donate"
import user_personal_center from "./page/content/user/user_personal_center"
import user_publicInfo from "./page/content/user/user_publicInfo"
import user_qa from "./page/content/user/user_q&a"
import foundation_home from "./page/content/foundation/foundation_home"
import foundation_project_info from "./page/content/foundation/foundation_project_info"
import foundation_addProject from "./page/content/foundation/foundation_addProject"
import foundation_addPhase from "./page/content/foundation/foundation_addPhase"
import foundation_qa from "./page/content/foundation/foundation_q&a"
import foundation_prove from "./page/content/foundation/foundation_prove"
import foundation_info from "./page/content/foundation/foundation_info"
import admin_home from "./page/content/admin/admin_home"
import admin_foundation_handle from "./page/content/admin/admin_foundation_handle"
import admin_foundation_isHandle from "./page/content/admin/admin_foundation_isHandle"
import admin_project_handle from "./page/content/admin/admin_project_handle"
import admin_project_isHandle from "./page/content/admin/admin_project_isHandle"
import admin_other from "./page/content/admin/admin_other"



export default [
  { path: '/login', name: 'login', component: login },
  { path: '/donor_register', name: 'donor_register', component: donor_register },
  { path: '/foundation_register', name: 'foundation_register', component: foundation_register },
  { path: '/walletInfo', name: 'walletInfo', component: walletInfo },
  { path: '/createWallet', name: 'createWallet', component: createWallet },
  { path: '/', name: '/', component: user_home },
  { path: '/user_home', name: 'user_home', component: user_home },
  { path: '/user_projectDetail/:project_id', name: 'user_projectDetail', component: user_projectDetail },
  { path: '/user_donate', name: 'user_donate', component: user_donate },
  { path: '/user_personal_center', name: 'user_personal center', component: user_personal_center },
  { path: '/user_publicInfo', name: 'user_publicInfo', component: user_publicInfo },
  { path: '/user_qa', name: 'user_qa', component: user_qa },
  { path: '/foundation_home', name: 'foundation_home', component: foundation_home },
  { path: '/foundation/foundation_project_info', name: 'foundation_project_info', component: foundation_project_info },
  { path: '/foundation/foundation_addProject', name: 'foundation_addProject', component: foundation_addProject },
  { path: '/foundation/foundation_addPhase/:project_id', name: 'foundation_addPhase', component: foundation_addPhase },
  { path: '/foundation/foundation_qa', name: 'foundation_qa', component: foundation_qa },
  { path: '/foundation/foundation_prove', name: 'foundation_prove', component: foundation_prove },
  { path: '/foundation/foundation_info', name: 'foundation_info', component: foundation_info },
  { path: '/admin_home', name: 'admin_home', component: admin_home },
  { path: '/admin/admin_foundation_handle', name: 'admin_foundation_handle', component: admin_foundation_handle },
  { path: '/admin/admin_foundation_isHandle', name: 'admin_foundation_isHandle', component: admin_foundation_isHandle},
  { path: '/admin/admin_project_handle', name: 'admin_project_handle', component: admin_project_handle },
  { path: '/admin/admin_project_isHandle', name: 'admin_project_isHandle', component: admin_project_isHandle },
  { path: '/admin/admin_other', name: 'admin_other', component: admin_other },
]
