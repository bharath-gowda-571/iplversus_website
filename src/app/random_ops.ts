
export function  
push_in_sorted_order(arr:string[],ele:string){
    
    if(arr.length==0){
      arr.push(ele)
      return arr
    }

    for(var i=0;i<arr.length-1;i++){
      if(arr[i]<ele &&ele<arr[i+1]){
         arr.splice(i+1,0,ele)
         return arr
      }
    }
    if(ele<arr[0]){
      
      arr.splice(0,0,ele)
    }
    else if(ele>arr[arr.length-1]){
      
      arr.push(ele)

    }
    return arr
  }
