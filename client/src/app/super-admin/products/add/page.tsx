  'use client'
import { protectProductFormAction } from '@/actions/product';
  import { Button } from '@/components/ui/button';
  import { Input } from '@/components/ui/input';
  import { Label } from '@/components/ui/label';
  import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
  import { Textarea } from '@/components/ui/textarea';
  import { useToast } from '@/hooks/use-toast';
  import { useProductStore } from '@/store/useProductStore';
  import { Upload } from 'lucide-react';
  import Image from 'next/image';
  import { useRouter, useSearchParams } from 'next/navigation';
  import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'

  const categories = [
    "Fashion",
    "Electronics",
    "Hand bags",
    "Wallet",
    "Sun glass",
    "Caps & Hats",
  ]

  const sizes = ["XS", "S", "M", "L", "XL", "2XL", "3XL"]

  const colors = [
    { name: "White", class: "bg-[#FFFFFF]" },
    { name: "Black", class: "bg-[#000000]" },
    { name: "Navy", class: "bg-[#000080]" },
    { name: "Yellow", class: "bg-[#FFFF00]" },
    { name: "Orange", class: "bg-[#FB923C]" },
    { name: "Green", class: "bg-[#22C55E]" },
    { name: "Pink", class: "bg-[#EC4899]" },
    { name: "Cyan", class: "bg-[#00FFFF]" },
    { name: "Blue", class: "bg-[#3B82F6]" },
  ];

  const brands = ["Nike", "Adidas", "Puma", "Reebok", "Dolche Gabana", "Luis vuitton"]

  interface FormState {
    name: string,
    brand: string,
    description: string,
    category: string,
    gender: string,
    price: string,
    stock: string
  }


  function SuperAdminManageProductPage() {

    const [formSate, setFormState] = useState({
      name: '',
      brand: '',
      description: '',
      category: '',
      gender: '',
      price: '',
      stock: ''
    });

    const [selectedSizes, setSelectedSizes] = useState<string[]>([])
    const [selectedColors, setSelectedColors] = useState<string[]>([])
    const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  
    const {toast} = useToast();

    const searchParams = useSearchParams();
    const getCurrentEditedProductId = searchParams.get('id')
    const isEditMode = !!getCurrentEditedProductId

    const router = useRouter();

    // fetching things from useProductStore()
    const {createProduct, updateProduct, getProductById, isLoading, error} = useProductStore();

    useEffect(() =>{

      if(isEditMode){
        getProductById(getCurrentEditedProductId).then((product) => {
          if(product){
            setFormState({
              name: product.name,
              brand: product.brand,
              description: product.description,
              category: product.category,
              gender: product.gender,
              price: product.price.toString(),
              stock: product.stock.toString(), 
            })
            setSelectedSizes(product.sizes);
            setSelectedColors(product.colors);
          }
        })
      }
    }, [isEditMode, getCurrentEditedProductId, getProductById])

    // after clicking on edit Product.. and again clicking on  ADD Product age, the edit page is still open and hence to solve this we need to set the getcurrentProductId =null and set the form state
    useEffect(() => {
      console.log(getCurrentEditedProductId, "getCurrentEditedProductId");
  
      if (getCurrentEditedProductId === null) {
        setFormState({
          name: "",
          brand: "",
          description: "",
          category: "",
          gender: "", 
          price: "",
          stock: "",
        });
        setSelectedColors([]);
        setSelectedSizes([]);
      }
    }, [getCurrentEditedProductId]);
  
  
    // handle input
    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormState((prev)=> ({
        ...prev,
        [e.target.name] : e.target.value
      }));
    };

    const handleSelectChange = (name: string, value: string) => {
      setFormState((prev) => ({
        ...prev,
        [name] :  value
      }))
    }
    
    const handleToggleSize = (size: string) =>{
      // logic 
      setSelectedSizes((prev) => prev.includes(size) ? prev.filter((s)=> s!== size) : [...prev, size])
    }

    const handleToggleColor = (color: string) =>{
      // logic 
      setSelectedColors((prev) => prev.includes(color) ? prev.filter((c)=> c!== color) : [...prev, color])
    }

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
      if(event.target.files){
        setSelectedFiles(Array.from(event.target.files));
      }
    }

    const handleFormSubmit =  async(event : FormEvent<HTMLFormElement>) => {
      event.preventDefault()

      // this action validity is from arcjet, checck: client/src/arcjet/index.ts
      // this will be done only one time.
      const checkFirstLevelFormSanitization =  await  protectProductFormAction()
  
      if(!checkFirstLevelFormSanitization.success){  
        toast({
          title: checkFirstLevelFormSanitization.error,
        })
        return
      }

      // we need to pass the form data, so that we can successfully submit it.
      const formData = new FormData()
      // now we need to append all the key ={} and the corresponding values
      Object.entries(formSate).forEach(([Key,value])=> {
        formData.append(Key, value)
      })
      
      // now, its need to append the sizes and the colors as the comma separated
      formData.append('sizes', selectedSizes.join(','))
      formData.append('colors', selectedColors.join(','))
      
      // now append the files
     if(!isEditMode){
      selectedFiles.forEach((file) => {
        formData.append('images', file)
      })

     }
      const result = isEditMode 
      ? await updateProduct(getCurrentEditedProductId, formData ) 
      : await createProduct(formData);

      console.log(result, "result");
      
      // if the product is successfully created and returns the result, and if there is no error, then we are gonna redirect the user to listing page
      if(result){
        router.push('/super-admin/products/list')
      }
    }

    return (
      <div className='p-6'>

        <div className='flex flex-col gap-6'>

          <header className='flex items-center justify-between'>
            <h1>Add product</h1>
          </header>

          <form 
            onSubmit={handleFormSubmit}
            className='grid gap-6 md:grid-cols-2 lg:grid-cols-1'>

            {/* Upload image div && edit product div*/}
            {
              isEditMode ? null : (
              <div className='mt-2 w-full flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-400 p-12'>

              <div className='text-center'>
                <Upload
                  className='mx-auto h-12 w-12 text-gray-400'
                />
                <div className='mt-4 w-32 h-8 items-center justify-center bg-black flex text-sm leading-6 text-gray-600 rounded-md'>
                  <Label>
                    <span className='text-white font-semibold'>
                Click to browse 
                    </span>
                    {/* <Button
                    key={}
                    className='items-center text-white font-semibold'
                    >Click to browse
                    </Button> */}
                    <input
                      type="file"
                      className='sr-only'
                      multiple
                      onChange={handleFileChange}
                    />
                  </Label>
                </div>
              </div>

              {/* Map selected files */}
              {
                  selectedFiles.length > 0 && (
                  <div  className='mt-4 flex flex-wrap gap-2'>
                    {
                      selectedFiles.map((file, index) => (
                        <div 
                        key={index} 
                        className='relative'>
                        <Image
                          src={URL.createObjectURL(file)}
                          alt={`Preview ${index + 1}`}
                          width={80}
                          height={80}
                          className='h-20 w-20 object-cover rounded-md '
                        />  
                        </div>
                      ))} 
                  </div>
              )}
            </div>
            )}
  


  
            <div className='space-y-4'>

              {/* Product Name */}
              <div>
                <Label>Product Name</Label>
                <Input
                  name='name'
                  placeholder='Product Name'
                  className='mt-1.5'
                  onChange={handleInputChange}
                  value={formSate.name}
                />
              </div>

              {/* Product Brand */}
              <div>
                <Label>Brand</Label>
                <Select 
                  value={formSate.brand}
                  onValueChange={(value) => handleSelectChange('brand', value)} 
                  name='brand'>
                  <SelectTrigger className='mt-1.5'>
                    <SelectValue
                      placeholder='Select Brand' />
                  </SelectTrigger>
                  <SelectContent>
                    {
                      brands.map((item) => <SelectItem key={item} value={item.toLowerCase()}>{item}</SelectItem>)
                    }
                  </SelectContent>
                </Select>
              </div>

              {/* Product Description */}
              <div>
                <Label>Product Description</Label>
                <Textarea
                  name='description'
                  className='mt-1.5 min-h-[150px]'
                  placeholder='Product Description'
                  onChange={handleInputChange}
                  value={formSate.description}
                />
              </div>

              {/*Category*/}
              <div>
                <Label>Category</Label>
                <Select 
                  name='category'
                  value={formSate.category} 
                  onValueChange={(value) => handleSelectChange('category', value)}
                >
                  <SelectTrigger className='mt-1.5'>
                    <SelectValue
                      placeholder='Select Category' />
                  </SelectTrigger>
                  <SelectContent>
                    {
                      categories.map((item) => <SelectItem key={item} value={item.toLowerCase()}>{item}</SelectItem>)
                    }
                  </SelectContent>
                </Select>
              </div>

              {/* Gender Selection */}
              <div>
                <Label>Gender</Label>
                <Select
                name='gender'
                value={formSate.gender} 
                onValueChange={(value) => handleSelectChange('gender', value)}
                >
                  <SelectTrigger className='mt-1.5'>
                    <SelectValue
                      placeholder='Select Gender' />
                  </SelectTrigger>

                  <SelectContent>
                    {/* direct creating selection for gender -->  without mapping from a function */}
                    <SelectItem value='men'> Men </SelectItem>
                    <SelectItem value='women'> Women </SelectItem>
                    <SelectItem value='kids'> Kids </SelectItem>
                    <SelectItem value='not-applicable'> Not Applicable </SelectItem>
                    {/* 
                    {
                      gender.map(item => <SelectItem key={item} value={item.toLowerCase()}>{item}</SelectItem>)
                    } 
                  */}
                  </SelectContent>
                </Select>
              </div>

              {/* Sizes */}
              <div> 
                <Label>Size</Label>
                <div className='mt-1.5 flex flex-wrap gap-2'>
                  {
                    sizes.map((item) => (
                      <Button
                      key={item}
                      type='button'
                      onClick={()=> handleToggleSize(item)}
                      variant={selectedSizes.includes(item) ? 'default' : 'outline'}
                      size={'sm'}>
                        {item}
                      </Button>
                    ))}
                </div>
              </div>

              {/* colors */}
              <div>
                <Label>Colors</Label>
                <div className='mt-1.5 flex flex-wrap gap-2'>
                  {
                    colors.map((color) => (
                      // here, we dont need any text to label and hence we can self-close this button
                      <Button
                        key={color.name}
                        type='button'
                        className={`h-8 w-8 rounded-full ${color.class} ${selectedColors.includes(color.name) ? 'ring-2 ring-primary ring-offset-2' : "" }`} 
                        onClick={()=> handleToggleColor(color.name)}
                      />
                    ))
                  }
                </div>
              </div>

              {/* Product Price */}
              <div>
                <Label>Product Price</Label>
                <Input
                  name='price'
                  placeholder='Enter Product listing price'
                  className='mt-1.5'
                  value={formSate.price}
                  onChange={handleInputChange}
                />
              </div>

              {/* Stock */}
              <div>
                <Label>Stock</Label>
                <Input
                  name='stock'
                  placeholder='Enter Stock available'
                  className='mt-1.5'
                  value={formSate.stock}
                  onChange={handleInputChange}
                />
              </div>

              {/* Create button */}
              <Button
                disabled = {isLoading}
                type='submit'
                className='mt-1.5 w-full'>
                {/* Create */}
                {
                  isLoading ? "Creating..." : "Create"
                }
              </Button>

            </div>
          </form>
        </div>
      </div>
    )
  }

  export default SuperAdminManageProductPage;