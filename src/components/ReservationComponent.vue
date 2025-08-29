<template>
    <form class="form" @submit.prevent="addReservation">
        <div class="field">
            <div class="label">
                <label for="passenger" class="text-wrapper">Putnik</label>
            </div>
            <select v-model="newRide.passenger" id="passenger">
                <option value="" disabled selected>Odaberite putnika</option>
                <option v-for="passenger in passengers" :value="passenger._id" :key="passenger._id">{{ passenger.firstName }} {{ passenger.lastName }}</option>
            </select>
        </div>
        <div class="field">
            <div class="label">
                <label for="endAddress" class="text-wrapper">Adresa</label>
                <select v-model="newRide.endAddress" id="endAddress">
                    <option value="" disabled selected>Unesite Adresu Dolaska</option>
                    <option v-for="address in addresses" :value="address._id" :key="address._id">{{ address.street }},{{ address.postalCode }} {{ address.town }}</option>
                </select>
            </div>
        </div>
        <div class="field text-field">
            <div class="label">
                <label for="dateTime" class="text-wrapper">Vrijeme Vožnje</label>
                <div class="box">
                    <input type="datetime-local" placeholder="Unesite datum i vrijeme vožnje" v-model="newRide.dateTime" id="dateTime">
                </div>
            </div>
        </div>
        <div class="field">
            <div class="label">
                <label for="driver" class="text-wrapper">Vozač</label>
            </div>
            <select v-model="newRide.driver" id="driver">
                <option value="" disabled selected>Odaberite vozača</option>
                <option v-for="driver in drivers" :value="driver._id" :key="driver._id">{{ driver.firstName }} {{ driver.lastName }}</option>
            </select>
        </div>
        <div class="field text-field">
            <div class="label">
                <label for="addRequest" class="text-wrapper">Dodatno</label>
                <div class="box">
                    <input type="text" placeholder="Dodatni zahtjevi" v-model="newRide.addRequest" id="addRequest">
                </div>
            </div>
        </div>

        <div class="button-box">
            <button type="submit" class="rectangle">
                <span class="button-text">Rezerviraj</span>
            </button>
        </div>
    </form>
</template>
<script>
    import axios from 'axios';

    export default{
        name:'ReservationComponent',
        data(){
            return{
                questions:[],
                drivers:[],
                passengers:[],
                addresses:[],
                newRide:{
                    driver:'',
                    passenger:'',
                    dateTime:'',
                    addRequest:'',
                    endAddress:''
                }
            }
        },
        methods:{
            async getDrivers(){
                try{
                    const response=await axios.get('http://localhost:3000/drivers');
                    this.drivers=response.data;
                }catch(error){
                    console.log('Greška',error);
                    alert('Greška na serveru');
                }
            },
            async getPassengers(){
                try{
                    const response=await axios.get('http://localhost:3000/passengers');
                    this.passengers=response.data;
                }catch(error){
                    console.error('Greška', error);
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
            async addReservation(){
                try{
                   const response=await axios.post('http://localhost:3000/rides',this.newRide);
                   if(response.status===201){
                    this.newRide={
                        driver:'',
                        passenger:'',
                        dateTime:'',
                        addRequest:'',
                        endAddress:''
                    };
                    alert('Vožnja rezervirana');
                   }else{
                    alert('Greška prilikom rezervacije');
                   }
                }catch(error){
                    console.error('Greška', error);
                    alert('Greška na serveru');
                }
            },
        },
        mounted(){
            this.getDrivers();
            this.getPassengers();
            this.getAddresses();
        }
    }
</script>
<style scoped>
body {
  background-color: whitesmoke;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh; /* osigurava vertikalno centriranje */
}

.form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
    max-width: 400px;
    margin: 100px auto; /* centrirano i odmaknuto od vrha */
    padding: 20px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 5px;
  width: 100%;
  max-width: 300px; /* ograničava širinu da bude estetski */
}

.text-field {
  margin-top: 10px;
}

.label {
  display: flex;
  flex-direction: column;
}

.label .text-wrapper {
  font-family: 'Times New Roman', Times, serif;
  font-weight: 700;
  color: black;
  font-size: 14px;
  margin-bottom: 4px; /* bolji razmak od inputa */
  text-align: left;
  display: block;
}

.box {
  width: 100%;
}

.box input,
select {
  width: 100%;
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

.button-box {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}

.rectangle {
  width: 110px;
  height: 32px;
  background-color: black;
  border-radius: 10px;
  border: none;
  position: relative;
  cursor: pointer;
  overflow: hidden;
}

.button-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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