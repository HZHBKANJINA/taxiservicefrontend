<template>
    <form @submit.prevent="addUser" class="registerform">
        <div class="field password-field">
            <div class="label">
                <label for="email" class="text-wrapper">Email: </label>
            </div>
            <div class="box">
                <input type="email" placeholder="Molimo unesite Vaš Email" id="email" v-model="newUser.email">
            </div>
        </div>
        <div class="field password-field">
            <div class="label">
                <label for="password" class="text-wrapper">Lozinka: </label>
            </div>
            <div class="box">
                <input type="password" placeholder="Molimo unesite Vašu Lozinku" id="password" v-model="newUser.password">
            </div>
        </div>
        <div class="field password-field">
            <div class="label">
                <label for="confirmPassword" class="text-wrapper">Ponovljena lozinka: </label>
            </div>
            <div class="box">
                <input type="password" placeholder="Molimo ponovite Vašu Lozinku" v-model="confirmPassword">
            </div>
        </div>
        <div class="field">
            <div class="label">
                <label for="role" class="text-wrapper">Odaberite ulogu: </label>
            </div>
            <select id="role" v-model="newUser.role" class="box">
                <option value="putnik">Putnik</option>
                <option value="operator">Operator</option>
            </select>
        </div>

        <div class="button-box">
            <button type="submit" class="rectangle">
                <span class="button-text">Registrirajte se</span>
            </button>
        </div>
    </form>
</template>
<script>
    import axios from 'axios';

    export default{
        name:'RegisterComponent',
        data(){
            return{
                newUser:{
                    email:'',
                    password:'',
                    role:''
                },
                confirmPassword:''
            }
        },
        methods:{
            async addUser(){
                if(this.newUser.password !== this.confirmPassword){
                    alert('Lozinke se ne podudaraju!');
                    return;
                }

                try{
                    const response=await axios.post('http://localhost:3000/users',this.newUser);
                    if(response.status===201){
                        this.newUser={
                            email:'',
                            password:'',
                            role:''
                        }
                        this.confirmPassword = '';
                        alert('Korisnik dodan');

                        this.$router.push('/prijava');
                    }else{
                        alert('Došlo je do greške prilikom dodavanja korisnika.');
                    }
                }catch(error){
                    console.error('Greška',error);
                    alert('Došlo je do greške prilikom komunikacije sa serverom.');
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
.registerform{
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