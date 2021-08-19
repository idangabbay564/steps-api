//configuraiton object type definition
export default interface Config {
    app: {
        port: string | number,
    },
    db: {
        connection_string: string
    }
}