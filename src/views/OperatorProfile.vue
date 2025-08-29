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
                <i class="fa-solid fa-user"></i> Profil
            </a>
        </div>
        <button class="split" @click="onLogout">
            <i class="fa-solid fa-right-from-bracket"></i> Odjava
        </button>
    </div>

    <div class="main-content">
        <div class="buttons">
            <button @click="otvoriDialog" class="button button-text">Ažuriraj profil</button>
            <ModalComponent v-if="dialogOtvoren" @zatvori="zatvoriDialog">
                <UpdateOperator @zatvori="zatvoriDialog"/>
                <button @click="zatvoriDialog" class="close">X</button>
            </ModalComponent>
        </div>
        <div class="operator-profile">
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
    import ModalComponent from '../components/ModalComponent.vue';
    import UpdateOperator from '../components/UpdateOperator.vue';


    export default{
        name:'OperatorProfile',
        components:{
            ModalComponent,
            UpdateOperator
       },
       data(){
        return{
            dialogOtvoren:false,
            operators:[]
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
        },
       },
       mounted(){}
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