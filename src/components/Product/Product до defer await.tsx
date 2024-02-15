import { useLoaderData } from "react-router-dom"
import { Product } from "../../interfaces/product.interface";

export function Product() {

    const data = useLoaderData() as Product[];

    console.log(data);

    return <>
        Product - {data.name}
    </>
};