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
        <MapComponent
            :center="{ lat: 43.6685332, lng: 17.9785454 }"
            :zoom="15"
            markerTitle="Ovčari"
    />
    </div>
</template>
<script>
    import MapComponent from '../components/MapComponent.vue'

    export default{
        name:'OperatorDashboard',
        components:{
            MapComponent
        },
        methods:{
            onLogout(){
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                window.location.assign("/");
            }
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
</style>