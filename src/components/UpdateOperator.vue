<template>
    <form @submit.prevent="updateOperator" class="form">
        <div class="field password-field">
            <div class="label">
                <label for="firstName" class="text-wrapper">Ime: </label>
            </div>
            <div class="box">
                <input type="text" placeholder="Unesite Vaše ime" id="firstName" v-model="updatedOperator.firstName">
            </div>
        </div>
        <div class="field password-field">
            <div class="label">
                <label for="lastName" class="text-wrapper">Prezime: </label>
            </div>
            <div class="box">
                <input type="text" placeholder="Unesite Vaše prezime" id="lastName" v-model="updatedOperator.lastName">
            </div>
        </div>
        <div class="field password-field">
            <div class="label">
                <label for="phone" class="text-wrapper">Telefon: </label>
            </div>
            <div class="box">
                <input type="text" placeholder="Unesite Vaš telefon" id="phone" v-model="updatedOperator.phone">
            </div>
        </div>
        <div class="field">
            <div class="label">
                <label for="user" class="text-wrapper">Odaberite Vaš Email: </label>
            </div>
            <select v-model="updatedOperator.user" id="user">
                <option value="" disabled selected>Odaberite Vaš Email: </option>
                <option v-for="user in users" :value="user._id" :key="user._id">{{ user.email }}</option>
            </select>
        </div>

        <div class="button-box">
            <button type="submit" class="rectangle">
                <span class="button-text">Spremi profil</span>
            </button>
        </div>
    </form>
</template>
<script>
    import axios from 'axios';
    
    export default{
        name:'UpdateOperator',
        data(){
            return{
                updatedOperator:{
                    firstName:'',
                    lastName:'',
                    phone:'',
                    user:null
                },
                users:[]
            }
        },
        methods:{
            async updateOperator(){
                try{
                    const response=await axios.post('http://localhost:3000/operators',this.updatedOperator);
                    if(response.status===201){
                        this.updatedOperator={
                            firstName:'',
                            lastName:'',
                            phone:'',
                            user:null
                        }
                        alert('Operator ažuriran');
                    }
                }catch(error){
                    console.error('Greška',error);
                    alert('Greška na serveru');
                }
            },
            async getUsers(){
                try{
                    const response=await axios.get('http://localhost:3000/users');
                    this.users=response.data;
                }catch(error){
                    console.error('Greška',error);
                    alert('Greška na serveru');
                }
            }
        },
        mounted(){
            this.getUsers();
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
.password-field{
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