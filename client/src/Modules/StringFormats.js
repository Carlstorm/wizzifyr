export function formatDate(datestring) {
    let date = new Date(datestring)
    return date.getDate()+'/'+(date.getMonth()+1)+'/'+date.getFullYear()+' '+(date.getHours().toString().length < 2 ? "0"+date.getHours() : date.getHours())+':'+(date.getMinutes().toString().length < 2 ? "0"+date.getMinutes() : date.getMinutes())
}


export function urlToName(link) {
    let linkSectionArray = link.split('.')
    return linkSectionArray[0].replace(/(^\w+:|^)\/\//, '');
}