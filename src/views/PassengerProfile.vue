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
        <div class="buttons">
            <button @click="otvoriDialog" class="button button-text">Ažuriraj profil</button>
            <ModalComponent v-if="dialogOtvoren" @zatvori="zatvoriDialog">
                <UpdatePassenger @zatvori="zatvoriDialog"/>
                <button @click="zatvoriDialog" class="close">X</button>
            </ModalComponent>
        </div>
        <div class="passenger-profile">
            <div class="field text-field">
                <label class="label">Ime</label>
                <input type="text" disabled class="text-wrapper">
            </div>
             <div class="field text-field">
                <label class="label">Prezime</label>
                <input type="text" disabled class="text-wrapper">
            </div>
             <div class="field text-field">
                <label class="label">Telefon</label>
                <input type="text" disabled class="text-wrapper">
            </div>
             <div class="field text-field">
                <label class="label">Adresa</label>
                <input type="email" disabled class="text-wrapper">
            </div>
        </div>
    </div>
</template>
<script>
    import ModalComponent from '../components/ModalComponent.vue'
    import UpdatePassenger from '../components/UpdatePassenger.vue'

    export default{
        name:'PassengerProfile',
        components:{
            ModalComponent,
            UpdatePassenger
        },
        data(){
            return{
                dialogOtvoren:false
            }
        },
        methods:{
            otvoriDialog() {
                this.dialogOtvoren = true;
            },
            zatvoriDialog() {
                this.dialogOtvoren = false;
            },
            onLogout(){
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                window.location.assign("/");
            }
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
    margin-left: 20px;
    padding: 20px;
    padding-top: 30px;
}
.buttons{
    display: flex; /* promjena: flex layout */
    gap: 10px;      /* razmak između gumba */
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
    display: flex; /* poravnanje teksta */
    align-items: center;
    justify-content: center;
}
.button-text{
    font-family: 'Times New Roman', Helvetica;
    font-weight: 700;
    color: yellow;
    font-size: 14px;
    text-align: center;
    white-space: nowrap;
}
.close {
  cursor: pointer;
  background: none;
  border: none;
  font-size: 1.5rem;
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
</style>