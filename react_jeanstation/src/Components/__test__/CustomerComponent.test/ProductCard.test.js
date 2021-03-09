import ProductCard from '../../CustomerComponents/HomePage/ProductCard/ProductCard'
import enzyme,{shallow} from 'enzyme'
describe("ProductCard Component testing",()=>{
    const wrapper=shallow(<ProductCard/>)
    it("check ProductCard contain div with class ProductList",()=>{
        expect(wrapper.find('div.ProductList')).toBeTruthy();
    });

    it("check ProductCard contain div with class ProductList",()=>{
        expect(wrapper.find('div.cardProduct')).toBeTruthy()
    });

    it("check ProductCard contain img tag",()=>{
        expect(wrapper.find('img')).toBeTruthy();
    });
})