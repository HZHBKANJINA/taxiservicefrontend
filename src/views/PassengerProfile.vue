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

</style>