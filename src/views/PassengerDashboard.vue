<template>
    <div class="header">
        <div class="crna boja"></div>
        <div class="zuta boja">
            <div class="text">TAXI SLUŽBA PIJAČAR</div>
        </div>
        <div class="crna boja"></div>
    </div>
    <div class="topnav">
        <a href="/putnicisucelje">Početna</a>
        <a href="/putnicionama">O nama</a>
        <a href="/putnicigalerija">Galerija</a>
        <a href="/povijestvoznji">Povijest Vožnji</a>
        <a href="/rezervacije">Rezervacija</a>
        <a @click="onLogout" class="split">Odjava</a>
        <a href="/putnikprofil" class="split">Profil</a>
    </div>
    <div class="main-content">
        <MapComponent
            v-if="mapLocation"
            :center="mapLocation"
            :zoom="15"
            markerTitle="Moja adresa"
        />
    </div>
</template>
<script>
    import MapComponent from '../components/MapComponent.vue'
    import axios from 'axios';
    
    export default{
        name:'PassengerDashboard',
        components:{
            MapComponent
        },
        data(){
            return{
                mapLocation:null,
            }
        },
        methods:{
            async getPassengerLocation(){
                try{
                    const email = JSON.parse(localStorage.getItem("user")).email;
                    const apiKey = process.env.VUE_APP_GOOGLE_MAP_API_KEY;

                   const response = await axios.get('http://localhost:3000/passengers');
                   const passengers = response.data;
                   
                   const passenger = passengers.find(p => p.user?.email === email);

                   if(!passenger || !passenger.address){
                    alert("Putnik ili adresa nisu pronađeni");
                    return;
                   }

                   const fullAddress = `${passenger.address.street}, ${passenger.address.town}, ${passenger.address.postalCode}, ${passenger.address.country}`;

                   const geo=await axios.get('https://maps.googleapis.com/maps/api/geocode/json',{
                    params:{
                        address:fullAddress,
                        key:apiKey
                    }
                   });

                   if(geo.data.status === "OK"){
                    this.mapLocation = geo.data.results[0].geometry.location;
                   }else{
                    console.warn("Geokodiranje nije uspjelo", geo.data.status);
                   }
                }catch(err){
                    console.error("Greška:", err);
                    alert("Greška na serveru");
                }
            },

            onLogout(){
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                window.location.assign("/");
            }
        },
        mounted(){
            this.getPassengerLocation();
        }
    }
</script>
<style scoped>
body{
    background-color: whitesmoke;
    margin: 0;
    padding: 0;
}
.header{
    background-color: whitesmoke;
    display: flex;
    height: 150px;
}
.boja{
    flex: 1;
}
.crna{
    background-color: black;
}
.zuta{
    background-color: yellow;
    position: relative;
}
.text{
     position: absolute;
     top: 50%;
     left: 50%;
     transform: translate(-50%,-50%);
     font-size: 36px;
     font-family: 'Times New Roman', Times, serif;
     color: black;
     white-space: nowrap;
     font-weight: bolder;
}
.topnav{
    background-color: black;
    overflow: hidden;
    margin-top: 5px;
}
.topnav a{
    float: left;
    color: black;
    text-align: center;
    padding: 14px 16px;
    text-decoration: none;
    font-size: 17px;
    background-color: yellow;
    margin-right:5px
}
.topnav a:hover{
    background-color: whitesmoke;
    color: black;
}
.topnav a.split{
    float: right;
    margin-left: 5px;
    margin-right: 0;
}
</style>