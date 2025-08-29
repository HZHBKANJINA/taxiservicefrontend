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
            <a href="/operatorprofil">
                <i class="fa-solid fa-user"></i>Profil
            </a>
        </div>
        <button class="split" @click="onLogout">
            <i class="fa-solid fa-right-from-bracket"></i> Odjava
        </button>
    </div>

    <div class="main-content">
        <div class="buttons">
            <button @click="otvoriDialog" class="button button-text">Dodaj Vozača</button>
            <ModalComponent v-if="dialogOtvoren" @zatvori="zatvoriDialog">
                <AddDriver @zatvori="zatvoriDialog"/>
                <button @click="zatvoriDialog" class="close">X</button>
            </ModalComponent>
        </div>
        <div class="table-content">
            <table>
                <thead>
                    <tr>
                        <th>IME</th>
                        <th>PREZIME</th>
                        <th>ADRESA</th>
                        <th>TELEFON</th>
                        <th>VOZILO</th>
                        <th>REGISTRACIJA</th>
                    </tr>
                </thead>
                <tbody v-if="drivers.length">
                    <tr v-for="driver in drivers" :key="driver._id" :value="driver._id">
                        <td>{{ driver.firstName }}</td>
                        <td>{{ driver.lastName }}</td>
                        <td>{{ driver.address.street }}, {{ driver.address.postalCode }} {{ driver.address.town }}</td>
                        <td>{{ driver.phone }}</td>
                        <td>{{ driver.vehicle.brand }} {{ driver.vehicle.model }}</td>
                        <td>{{ driver.vehicle.license }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
    import ModalComponent from '../components/ModalComponent.vue';
    import AddDriver from '../components/AddDriver.vue';
    import axios from 'axios';
    import {io} from 'socket.io-client'

    export default{
        name:'OperatorDrivers',
        components:{
            ModalComponent,
            AddDriver
        },
        data(){
            return{
                dialogOtvoren:false,
                drivers:[]
            }
        },
        methods:{
            otvoriDialog(){
                this.dialogOtvoren=true;
            },
            zatvoriDialog(){
                this.dialogOtvoren=false;
            },
            onLogout(){
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                window.location.assign("/");
            },
            async getDrivers(){
                try{
                    const response=await axios.get('http://localhost:3000/drivers');
                    this.drivers=response.data;
                }catch(error){
                    console.log('Greška',error);
                    alert('Greška na serveru');
                }
            }
        },
        mounted(){
            this.getDrivers();
            this.socket=io('http://localhost:3000');

            this.socket.on('addedDriver',()=>{
                this.getDrivers();
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
.buttons{
    display: flex;
    gap: 10px;
    justify-content: flex-end;
    margin-bottom: 20px;
}
.button{
    width: 110px;
    height: 32px;
    background-color: black;
    border-radius: 10px;
    border: none;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
}
.button-text{
    font-family: 'Times New Roman',Helvetica;
    font-weight: 700;
    color: yellow;
    font-size: 14px;
    text-align: center;
    white-space: nowrap;
}
.close{
    cursor: pointer;
    background: none;
    border: none;
    font-size: 1.5rem;
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