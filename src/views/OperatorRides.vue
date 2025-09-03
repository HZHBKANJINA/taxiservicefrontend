<template>
    <div class="header">
        <div class="crna boja"></div>
        <div class="zuta boja">
            <div class="text">OPERATORI</div>
        </div>
        <div class="crna boja"></div>
    </div>
    <div class="sidebar">
        <div class="sidebar-links">
            <a href="/operatorsucelje">
                <i class="fa-solid fa-house"></i> Početna
            </a>
            <a href="/operatorvozaci">
                <i class="fa-solid fa-user"></i> Vozači
            </a>
            <a href="/operatorvozila">
                <i class="fa-solid fa-car"></i> Vozila
            </a>
            <a href="/svevoznje">
                <i class="fa-solid fa-car-side"></i> Vožnje
            </a>
            <a href="/operatorprofil">
                <i class="fa-solid fa-user"></i> Profil
            </a>
        </div>
        <button class="split" @click="onLogout">
            <i class="fa-solid fa-right-from-bracket"></i> Odjava
        </button>
    </div>
    <div class="main-content">
        <div class="table-content">
            <table>
                <thead>
                    <tr>
                        <th>PUTNIK</th>
                        <th>VOZAČ</th>
                        <th>VRIJEME VOŽNJE</th>
                        <th>LOKACIJA</th>
                        <th>STATUS REZERVACIJE</th>
                    </tr>
                </thead>
                <tbody v-if="rides.length">
                    <tr v-for="ride in rides" :key="ride._id" :value="ride._id">
                        <td>{{ ride.passenger.firstName }} {{ ride.passenger.lastName }}</td>
                        <td>{{ ride.driver.firstName }} {{ ride.driver.lastName }}</td>
                        <td>{{ formatDateTime(ride.dateTime) }}</td>
                        <td>{{ ride.endAddress.street }} {{ ride.endAddress.town }}</td>
                        <td>
                            <i class="fa-solid fa-circle-check" style="color: green; cursor: pointer;" @click="confirmReservation(ride)"></i>   <i class="fa-solid fa-circle-xmark" style="color: red; cursor: pointer;" @click="cancelReservation(ride)"></i>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
    import axios from 'axios';
    import dayjs from 'dayjs';
    import {io} from 'socket.io-client';

    export default{
        name:'OperatorRides',
        data(){
            return{
                rides:[]
            }
        },
        methods:{
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
                return dayjs(isoDate).format('DD.MM.YYYY  HH:mm');
            },
            async confirmReservation(ride){
                try{
                    await axios.put(`http://localhost:3000/drivers/${ride.driver._id}`,{
                        status:'Zauzet'
                    });
                    alert('Rezervacija potvrđena');
                }catch(error){
                    console.error('Greška',error);
                    alert('Greška na serveru');
                }
            },
            async cancelReservation(ride){
                try{
                    await axios.put(`http://localhost:3000/drivers/${ride.driver._id}`,{
                        status:'Slobodan'
                    });
                    alert('Rezervacija odbijena');
                }catch(error){
                    console.error('Greška',error);
                    alert('Greška na serveru');
                }
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
body {
    background-color: whitesmoke;
}

.header {
    background-color: whitesmoke;
    display: flex;
    height: 150px;
    width: auto;
}

.boja {
    flex: 1;
}

.crna {
    background-color: black;
}

.zuta {
    background-color: yellow;
    position: relative;
}

.text {
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

.sidebar {
    height: calc(100% - 150px);
    width: 160px;
    position: fixed;
    z-index: 1;
    top: 150px;
    left: 0;
    background-color: black;
    overflow-x: hidden;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 16px 0;
    margin-bottom: 30px;
}

.sidebar-links {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.sidebar a {
    background-color: yellow;
    color: black;
    padding: 4px 8px;
    text-decoration: none;
    font-size: 18px;
    display: block;
    text-align: center;
    margin-bottom: 40px;
    border-radius: 4px;
    width: 100%;
}

.sidebar .split {
    background-color: yellow;
    color: black;
    padding: 4px 8px;
    font-size: 18px;
    border: none;
    cursor: pointer;
    text-align: center;
    width: 100%;
    border-radius: 4px;
    margin-bottom: 30px;
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