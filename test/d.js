function a() {
    import("./source").then(res => {
        console.log("res", res);
    });
    import("./source2").then(res => {
        console.log("res", res);
    });
}
