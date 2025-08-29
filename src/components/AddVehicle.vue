<template>
    <form @submit.prevent="addVehicle" class="form">
         <div class="field text-field">
            <div class="label">
                <label for="brand" class="text-wrapper">Marka: </label>
            </div>
            <div class="box">
                <input type="text" placeholder="Unesite Marku Vozila" id="brand" v-model="newVehicle.brand">
            </div>
        </div>
         <div class="field text-field">
            <div class="label">
                <label for="model" class="text-wrapper">Model: </label>
            </div>
            <div class="box">
                <input type="text" placeholder="Unesite Model Vozila" id="model" v-model="newVehicle.model">
            </div>
        </div>
         <div class="field text-field">
            <div class="label">
                <label for="license" class="text-wrapper">Registracija: </label>
            </div>
            <div class="box">
                <input type="text" placeholder="Unesite Registracijsku Oznaku Vozila" id="license" v-model="newVehicle.license">
            </div>
        </div>

        <div class="button-box">
            <button type="submit" class="rectangle">
                <span class="button-text">Dodaj Vozilo</span>
            </button>
        </div>
    </form>
</template>
<script>
    import axios from 'axios';

    export default{
        name:'AddVehicle',
        data(){
            return{
                newVehicle:{
                    brand:'',
                    model:'',
                    license:''
                }
            }
        },
        methods:{
            async addVehicle(){
                try{
                    const response=await axios.post('http://localhost:3000/vehicles',this.newVehicle);
                    if(response.status===201){
                        this.newVehicle={
                            brand:'',
                            model:'',
                            license:''
                        };
                        alert('Vozilo dodano');
                    }else{
                        alert('Greška prilikom dodavanja vozila,provjerite podatke');
                    }
                }catch(error){
                    console.log('Greška',error);
                    alert('Greška na serveru');
                }
            }
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