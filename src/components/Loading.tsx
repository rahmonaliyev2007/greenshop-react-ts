import React, { FC } from 'react'

interface MainMappingLoadingProps {
    length: number;
  }
  

  export const MainMappingLoading: FC<MainMappingLoadingProps> = ({ length }) => {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-3 justify-items-center gap-5">
        {Array.from({ length }).map((_, i) => (
          <div key={i} className="max-w-[300px] w-full border-t-2 border-t-transparent hover:border-t-[#46A358] transi group rounded">
            <div className="card_img relative transi rounded overflow-hidden">
              <div className="bg-[#FBFBFB] loading transi w-full h-[275px] flex justify-center items-center">
                <div className="w-full h-auto object-contain mix-blend-multiply scale-100 group-hover:scale-110 transi" />
              </div>
            </div>
            <div>
              <h4 className="transi my-2 w-[60%] loading h-[25px]"></h4>
              <p className="w-[40%] h-[24px] loading"></p>
            </div>
          </div>
        ))}
      </div>
    );
  };

export function AboutProductLoading(){
    return (
        <div className="flex justify-between items-start gap-10">
                <div className='flex items-center justify-between w-[50%] gap-3'>
                    <div>
                        {Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className="w-[100px] h-[100px] loading mix-blend-multiply overflow-hidden border rounded group hover:border-[#42A358] transi my-2 bg-gray-50"></div>
                        ))}
                    </div>
                    <div className='w-[70%]'>
                        <div className="h-[400px] w-full loading bg-gray-300"></div>
                    </div>
                </div>
                <div className='w-[50%]'>
                    <div className='flex justify-between items-center border-[#42A358]/40 pb-4 border-b-2 '  >
                        <div className='flex items-center gap-3 '>
                            <div className='w-[60px] h-[60px] loading !rounded-full overflow-hidden border-2 cursor-pointer border-transparent'></div>
                            <div className='text-2xl font-semibold'>
                                <h3 className='loading w-[150px] h-[25px] mb-2 !rounded'></h3>
                                <p className='loading w-[100px] h-[20px] !rounded'></p>
                            </div>
                        </div>
                        <div className='flex items-end gap-1 flex-col'>
                            <div className='w-[120px] h-[25px] loading !rounded'></div>
                            <span className='loading w-[150px] h-[15px] !rounded'></span>
                        </div>
                    </div>
                    <div>
                        <h4 className='text-xl font-semibold text-black/80 my-2'>Short Description : </h4>
                        <p className='loading w-full h-[50px]'></p>
                    </div>
                    <div>
                        <h4 className='text-xl font-semibold text-black/80 my-3'>Size : </h4>
                        <div className='flex items-center gap-3'>
                            {["S", "M", "X", "XL"].map((size, i) => (
                                <div key={i} className="loading w-8 h-8 rounded-full"></div>
                            ))}
                        </div>
                    </div>
                    <div className='flex items-center gap-3 my-3'>
                        <div className='loading w-8 h-8 rounded-full'></div>
                        <p className='loading w-6 h-6'></p>
                        <div className='loading w-8 h-8 rounded-full'></div>
                    </div>
                    <div className='flex items-center gap-3'>
                        <div className='loading w-[120px] h-[40px] rounded'></div>
                        <div className='loading w-[120px] h-[40px] rounded'></div>
                        <div className='loading w-10 h-10 rounded'></div>
                    </div>
                    <div>
                        <h4 className='text-gray-500 my-3 flex items-center gap-3'>SKU : <div className='!rounded loading w-[60%] h-[20px]'></div></h4>
                        <h4 className='text-gray-500 my-3 flex items-center gap-3'>Categories : <div className='!rounded loading w-[30%] h-[20px]'></div></h4>
                        <h4 className='text-gray-500 my-3 flex items-center gap-3'>Tags : <div className='!rounded loading w-[40%] h-[20px]'></div></h4>
                    </div>
                </div>
            </div>
    )
}