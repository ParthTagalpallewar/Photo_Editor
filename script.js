document.addEventListener('DOMContentLoaded', function() {
    let editor = document.getElementById('editor');
    var ctx = editor.getContext('2d');
    let button_upload = document.getElementById('btn-upload');
    let imageData = [];

    //ladle click of upload button
    button_upload.addEventListener('click', function() {
        
        let imageInput =  document.createElement('input');
        imageInput.type = 'file';
        imageInput.accept = 'image/*';
        imageInput.click();
        imageInput.addEventListener('change', (event)=>{

            if(event.target.files && event.target.files[0]){
                imageData = [];
                var selectedFile = event.target.files[0];
                const image = new Image();
                image.onload = () => {
                    editor.width = image.width;
                    editor.height = image.height;
                    ctx.drawImage(image, 0, 0);
                    //image got from canvas consist of 1D array [R, G, B, A,      R, G, B, A]
                    let image1D = ctx.getImageData(0, 0, editor.width, editor.height).data;
                    
                    //create an RGB matrix from 1D array
                    for(let row = 0; row < editor.height; row++){
                        let curr_col = [];
                        for(let col = 0; col < editor.width; col++){
                            
                            let idx = (row*editor.width+col)*4;

                            let r = image1D[idx];
                            let g = image1D[idx+1];
                            let b = image1D[idx+2];
                            let a = image1D[idx+3];

                            const pixels = [r, g, b, a];

                            curr_col.push(pixels);
                        }
                        imageData.push(curr_col);
                    }

                }
                image.onerror = () => {
                    alert("Can Not Use this Image");
                }

                image.src = URL.createObjectURL(selectedFile);

               

            }

        })

    });

    //convert matrix into 1D array
    function setImageData(data, rows, cols) {
        const Image = Array.from({ length: rows*cols*4 }); 
        for(let i = 0;i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                for (let k = 0; k < 4; k++) {
                    Image[(i * cols + j) * 4 + k] = data[i][j][k]; 
                }
            }
        }                                     //w    h
        const idata = ctx.createImageData(cols, rows);
        idata.data.set(Image);
        editor.width = cols; 
        editor.height = rows; 
        ctx.putImageData(idata, 0, 0);
    }

    let flipHorizontalButton = document.getElementById('btnFlipHorizontal');
    flipHorizontalButton.addEventListener('click', () => {
        let rows = editor.height;
        let cols = editor.width;

        for(let row = 0; row < rows; row++){
            for(let col = 0; col < Math.floor(cols/2); col++){
                let lastCol = cols-col-1;
                let temp = imageData[row][col];
                imageData[row][col] = imageData[row][lastCol];
                imageData[row][lastCol] = temp;
            }
        }


        setImageData(imageData, editor.height, editor.width);
        ``
    })

    let flipVerticalButton = document.getElementById('btnFlipVertical');
    flipVerticalButton.addEventListener('click', () => {
        let rows = editor.height;

        for(let row = 0; row < Math.floor(rows/2); row++){
            let lastRow = rows-row-1;
            let temp = imageData[row];
            imageData[row] = imageData[lastRow];
            imageData[lastRow] = temp;
        }


        setImageData(imageData, editor.height, editor.width);
        ``
    })
});
