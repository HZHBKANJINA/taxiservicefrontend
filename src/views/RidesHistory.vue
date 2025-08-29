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
        <div class="table-content">
            <table>
                <thead>
                    <tr>
                        <th>IME</th>
                        <th>PREZIME</th>
                        <th>VOZAČ</th>
                        <th>VRIJEME</th>
                        <th>LOKACIJA</th>
                    </tr>
                </thead>
                <tbody v-if="rides.length">
                    <tr v-for="ride in rides" :key="ride._id" :value="ride._id">
                        <td>{{ ride.passenger.firstName }}</td>
                        <td>{{ ride.passenger.lastName }}</td>
                        <td>{{ ride.driver.firstName }} {{ ride.driver.lastName }}</td>
                        <td>{{ formatDateTime(ride.dateTime) }}</td>
                        <td>{{ ride.endAddress.street }} {{ ride.endAddress.town }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
    import axios from 'axios';
    import {io} from 'socket.io-client'
    import dayjs from 'dayjs';

    export default{
        name:'RidesHistory',
        data(){
            return{
                rides:[]
            }
        },
        methods:{
            onLogout(){
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                window.location.assign("/");
            },
            async getRides(){
                try{
                    const response=await axios.get('http://localhost:3000/rides');
                    this.rides=response.data;
                }catch(error){
                    console.log('Greška',error);
                    alert('Greška na serveru');
                }
            },
            formatDateTime(isoDate){
               return dayjs(isoDate).format('DD.MM.YYYY  HH:mm')
            }
        },
        mounted(){
            this.getRides();
            this.socket=io('http://localhost:3000');

            this.socket.on('rideAdded',()=>{
                this.getRides();
            });
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
.main-content {
    margin-left: 160px;
    padding: 20px;
    padding-top: 30px;
}
.table-content{
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
}
thead{
    background-color: yellow;
}
thead th{
    padding: 3px;
    margin-right: 8px;
    border: 2px solid black;
    color: black;
    font-weight: bolder;
    text-align: center;
}
tbody{
    margin-top: 15px;
    background-color: yellow;
}
tbody td{
    padding: 3px;
    border: 2px solid black;
    text-align: center;
    color: black;
    font-weight: bolder;
    text-align: center;
}
</style>