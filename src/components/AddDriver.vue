<template>
    <form @submit.prevent="addDriver" class="form">
        <div class="field text-field">
            <div class="label">
                <label for="firstName" class="text-wrapper">Ime: </label>
            </div>
            <div class="box">
                <input type="text" placeholder="Unesite Ime Vozača" id="firstName" v-model="newDriver.firstName">
            </div>
        </div>
        <div class="field text-field">
            <div class="label">
                <label for="lastName" class="text-wrapper">Prezime: </label>
            </div>
            <div class="box">
                <input type="text" placeholder="Unesite Prezime Vozača" id="lastName" v-model="newDriver.lastName">
            </div>
        </div>
        <div class="field">
            <div class="label">
                <label for="address" class="text-wrapper">Adresa Vozača: </label>
            </div>
            <select v-model="newDriver.address" id="address">
                <option value="" disabled selected>Odaberite Adresu</option>
                <option v-for="address in addresses" :value="address._id" :key="address._id">{{ address.street }} , {{ address.town }}</option>
            </select>
        </div>
        <div class="field text-field">
            <div class="label">
                <label for="phone" class="text-wrapper">Telefon Vozača: </label>
            </div>
            <div class="box">
                <input type="text" placeholder="Unesite Telefon Vozača" id="phone" v-model="newDriver.phone">
            </div>
        </div>
        <div class="field">
            <div class="label">
                <label for="vehicle" class="text-wrapper">Vozilo Vozača: </label>
            </div>
            <select v-model="newDriver.vehicle" id="vehicle">
                <option value="" disabled selected>Odaberite Vozilo</option>
                <option v-for="vehicle in vehicles" :value="vehicle._id" :key="vehicle._id">{{ vehicle.brand }},{{ vehicle.model }}</option>
            </select>
        </div>

        <div class="button-box">
            <button type="submit" class="rectangle">
                <span class="button-text">Dodaj Vozača</span>
            </button>
        </div>
    </form>
</template>
<script>
    import axios from 'axios';

    export default{
        name:'AddDriver',
        data(){
            return{
                addresses:[],
                vehicles:[],
                newDriver:{
                    firstName:'',
                    lastName:'',
                    address:'',
                    phone:'',
                    vehicle:''
                }
            }
        },
        methods:{
            async addDriver(){
                try{
                    const response=await axios.post('http://localhost:3000/drivers',this.newDriver);
                    if(response.status===201){
                        this.newDriver={
                            firstName:'',
                            lastName:'',
                            address:'',
                            phone:'',
                            vehicle:''
                        };
                        alert('Vozač dodan');
                    }else{
                        alert('Greška prilikom dodavanja vozača,provjerite podatke');
                    }
                }catch(error){
                    console.log('Greška',error);
                    alert('Greška na serveru');
                }
            },
            async getAddresses(){
                try{
                    const response=await axios.get('http://localhost:3000/addresses');
                    this.addresses=response.data;
                }catch(error){
                    console.log('Greška',error);
                    alert('Greška na serveru');
                }
            },
            async getVehicles(){
                try{
                    const response=await axios.get('http://localhost:3000/vehicles');
                    this.vehicles=response.data;
                }catch(error){
                    console.log('Greška',error);
                    alert('Greška na serveru');
                }
            }
        },
        mounted(){
            this.getAddresses();
            this.getVehicles();
        }
    }
</script>
<style scoped>
body{
    background-color: whitesmoke;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
}
.form{
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    margin-top: 175px;
}
.field{
    display: flex;
    flex-direction: column;
    gap: 3px;
}
.text-field{
    margin-top: 10px;
}
.label{
    width: 140px;
    height: 22px;
}
.label .text-wrapper{
    width: 140px;
    height: 22px;
    font-family: 'Times New Roman', Times, serif;
    font-weight: 700;
    color: black;
    font-size: 14px;
    text-align: left;
    line-height: normal;
}
.box{
    width: 180px;
    height: 28px;
}
.box input,select{
    width: 180px;
    height: 28px;
    background-color: white;
    color: black;
    border-radius: 10px;
    border: 2px solid black;
    opacity: 0.5;
    font-size: 12px;
    padding-left: 8px;
    box-sizing: border-box;
}
.button-box{
    margin-top: 15px;
    width: 100vw;
    display: flex;
    justify-content: center;
}
.rectangle{
    width: 110px;
    height: 32px;
    background-color: black;
    border-radius: 10px;
    border: none;
    position: relative;
    cursor: pointer;
    overflow: hidden;
}
.button-text{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    font-family: 'Times New Roman', Helvetica;
    font-weight: 700;
    color: yellow;
    font-size: 14px;
    text-align: center;
    letter-spacing: 0;
    line-height: normal;
    white-space: nowrap;
}
</style>