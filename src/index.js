function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    // Объявление переменных 
        let result = [];
        let num = '';
        let stack = [];
        let out = [];
        let bracketArr = [];
        let prior = {
            1: ['*', '/'],
            2: ['+', '-']
        }
        // делаем операцию
    
        function doOper(num1,num2, operator)
        {
    
            switch (operator) {
                case prior[1][0]:
                    return num1*num2;
                    break;
                case prior[1][1]:
                    return num1/num2;
                    break;
                case prior[2][0]:
                    return num1+num2;
                    break;
                case prior[2][1]:
                    return num1-num2;
                    break;
            }
        }
    
        console.log(doOper(2,5, '*'));
    
       // проверка приоритета
        function priorityComparison(str1, str2current)
        {
            if ((prior[1].includes(str1) && prior[1].includes(str2current)) ||
             (prior[2].includes(str1) && prior[2].includes(str2current)) || 
             (prior[1].includes(str1) && prior[2].includes(str2current)))
             return true;
             else return false;
        }
    
    
       //console.log(priorityComparison('/', '-'))
    
    // приведение выражения к общему виду массива без пробелов
    
        expr = expr.replace(/\s/g, '');
        expr = expr.split('');
    
     
    
    
        for (let i = 0; i < expr.length; i++)
        {
            if (isNaN(Number(expr[i])) && expr[i] != ' ')
            {result.push(expr[i]);
            }
            else if (!isNaN(Number(expr[i])))
            {
                if (!isNaN(Number(expr[i])) && !isNaN(Number(expr[i+1])))
                {
                    num += expr[i];
                }
                else
                {
                    num += expr[i];
                    result.push(num);
                    num = '';
                }
            }
        }
    
    
    
    // распределние элементов в стэк и выходной массив
    
       for (let i = 0; i < result.length; i++)
       {
           if ( !isNaN(Number(result[i])))
           out.push(result[i]);
           else
           {
               if (priorityComparison(stack[stack.length-1], result[i]))
               {
    
                while (priorityComparison(stack[stack.length-1], result[i]))
                    {out.push(stack[stack.length-1]);
                    stack.pop();
                    }
    
    
                    stack.push(result[i]);
                        
               }
               else
                    {
                        stack.push(result[i]);
    
                        if (result[i] == '(')
                        {
                            bracketArr.push(stack.length-1);
    
                        }
    
                        if (result[i] == ')')
                        {
                            let elements = stack.splice(bracketArr[bracketArr.length-1], stack.length)
                            
                            for (let elem of elements.reverse())
                            {
                                out.push(elem);
                            }
    
                            bracketArr.pop();
                        }  
                    }
                    
           }
        //    console.log(stack);
        //     console.log(out);
       }
    
    
    // console.log('-------------------------');
    // console.log(bracketArr)
    // console.log(stack);
    // console.log(out);
    
    // объединение массивов и удаление скобок
        out = out.filter(elem => {
            if (elem != '(' && elem != ')')
            return true;
        }).concat(stack.reverse());
    
       // console.log(out);
    // вычисление
    
        stack = [];
        i = 0;
        for (let i = 0; i < out.length; i++)
        {
            if (!isNaN(Number(out[i])))
            {
                stack.push(Number(out[i]));
            }
            else
            {
                let res = doOper(Number(stack[stack.length-2]), Number(stack[stack.length-1]), out[i]);
                stack.pop();
                stack.pop();
                stack.push(res);
            }
            // console.log(out[i]);
            // console.log(stack);
        }
    
    
    return stack[0];
    
    }

module.exports = {
    expressionCalculator
}