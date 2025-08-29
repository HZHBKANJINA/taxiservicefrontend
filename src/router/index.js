import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import GalleryView from '../views/GalleryView.vue'
import RegisterView from '../views/RegisterView.vue'
import LoginView from '../views/LoginView.vue'
import OperatorDashboard from '../views/OperatorDashboard.vue'
import OperatorProfile from '../views/OperatorProfile.vue'
import OperatorDrivers from '../views/OperatorDrivers.vue'
import OperatorVehicles from '../views/OperatorVehicles.vue'
import PassengerDashboard from '../views/PassengerDashboard.vue'
import PassengerGallery from '../views/PassengerGallery.vue'
import PassengerAbout from '../views/PassengerAbout.vue'
import RidesHistory from '../views/RidesHistory.vue'
import ReservationView from '../views/ReservationView.vue'
import PassengerProfile from '../views/PassengerProfile.vue'

const routes = [
  {
    path: '/',
    name: 'HomeView',
    component: HomeView
  },
  {
    path:'/onama',
    name:'AboutView',
    component:AboutView
  },
  {
    path:'/galerija',
    name:'GalleryView',
    component:GalleryView
  },
  {
    path:'/registracija',
    name:'RegisterView',
    component:RegisterView
  },
  {
    path:'/prijava',
    name:'LoginView',
    component:LoginView
  },
  {
    path:'/operatorsucelje',
    name:'OperatorDashboard',
    component:OperatorDashboard
  },
  {
    path:'/operatorprofil',
    name:'OperatorProfile',
    component:OperatorProfile
  },
  {
    path:'/operatorvozaci',
    name:'OperatorDrivers',
    component:OperatorDrivers
  },
  {
    path:'/operatorvozila',
    name:'OperatorVehicles',
    component:OperatorVehicles
  },
  {
    path:'/putnicisucelje',
    name:'PassengerDashboard',
    component:PassengerDashboard
  },
  {
    path:'/putnicigalerija',
    name:'PassengerGallery',
    component:PassengerGallery
  },
  {
    path:'/putnicionama',
    name:'PassengerAbout',
    component:PassengerAbout
  },
  {
    path:'/povijestvoznji',
    name:'RidesHistory',
    component:RidesHistory
  },
  {
    path:'/rezervacije',
    name:'ReservationView',
    component:ReservationView
  },
  {
    path:'/putnikprofil',
    name:'PassengerProfile',
    component:PassengerProfile
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router