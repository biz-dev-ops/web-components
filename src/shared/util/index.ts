export default class Util {
    static titlelize(name: string) {
        if(!name)
            return name;

        return (name.charAt(0).toUpperCase() + name.slice(1))
            .replaceAll("_", " ")
            .replaceAll("-", " ");
    }
}