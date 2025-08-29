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
</template>
<script>
    export default{
        name:'PassengerGallery',
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
</style>