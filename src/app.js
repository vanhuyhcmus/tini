App({
    onLaunch(options) {
        console.log("App onLaunch");
    },
    onShow(options) {},
    onError(error) {
        console.log(error); // error là error do triggerError tạo ra
    },
});
