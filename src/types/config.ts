//configuraiton object type definition
export default interface Config {
    app: {//app related configurations
        port: string | number,
    },
    db: { //db related configurations
        connection_string: string
    }
}