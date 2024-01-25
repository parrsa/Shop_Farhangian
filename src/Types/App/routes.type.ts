export interface RoutesInterface {
 type: string;
 name: string;
 key: string;
 route: string;
 element: React.FC;
}
export interface Listnav {
    title: string,
    path: string,
    id: number,
    icon?: React.ReactNode,
    children?:any
}
export interface ListRoute {
    text:string;
    path:string;
    name:string;
    icon:React.ReactNode;
    id:number;
}
