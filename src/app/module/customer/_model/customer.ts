import { CustomerImage } from "./customer-image";

export class Customer{
    customer_id: number = 0;
    name: string = "";
    surname: string = "";
    rfc: string = "";
    mail: string = "";
    address: string = "";
    region_id: number = 0;
    image: CustomerImage = new CustomerImage();
    status: number = 0;
}