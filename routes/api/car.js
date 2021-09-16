const express = require('express');
const path = require("path");
const router = express.Router();
const fs = require("fs");
const Car = require("../../models/Cars");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: "./client/public/img/mark",
    filename: function(req, file, cb){
       cb(null, file.fieldname + '_' + Date.now() 
       + file.originalname)
    }
 });

 const uploadimgage = multer({
    storage: storage,
    limits:{
        fileSize: 100000000
    },
  }).single("mark");

router.post('/get', (req, res) => {
    Car.find({}).then(car => {
        if (car) {
             return res.status(200).send(car);
         }
     });
 });

router.post('/delete', (req, res) => {
    Car.deleteOne({ _id: req.body._id}).then(car => {
        if (car) {
            return res.status(200).json({message: 'Car deleted successfully. Refreshing data...', success: true})
        }
    });
});

router.post('/add', uploadimgage, (req, res) =>{
     console.log("req.file", req.file);
     let markpath;
     res.send(req.file); 
     Car.findOne({ name: req.body.name }).then(car => {
        if (car) {
            return res.status(400).json({ car: 'This car type already exists' });
        } else {
            if (req.file) {
                   
                markpath = '/img/mark/' + req.file.filename;
            } else {
                markpath = "";
            }
            const newCar = new Car({
                name: req.body.name,
                mark: markpath,
            });
            newCar
                .save()
                .then(car => {
                    return res.status(200).json(car)
                }).catch(err => console.log(err));
        }
    });

 }, (error, req, res, next) => {
     return res.status(400).send({ error: error.message })
 });

 router.post('/update', uploadimgage, (req, res) => {
    console.log("req.body", req.body);
    console.log("req.file1", req.file);
    const _id = req.body._id;
    res.send(req.file);
    let markpath ;
    Car.findOne({ _id }).then(car => {
        if (car) {
            if (req.file) {
                console.log("req.file", req.file);
                
                markpath = '/img/mark/' + req.file.filename;
            } else {

                markpath = req.body.mark1;
            }
            console.log("markpath", markpath);
            let update = {'name': req.body.name, 'mark': markpath};
            Car.update({ _id: _id}, {$set: update}, function(err, result) {
                if (err) {
                    return res.status(400).json({ message: 'Unable to update battery.' });
                } else {
                    console.log("success");                    
                    return res.status(200).json({ message: 'Service updated successfully. Refreshing data...', success: true });
                }
            });
        } else {
            return res.status(400).json({ message: 'Now battery found to update.' });
        }
    });
}, (error, req, res, next) => {
    return res.status(400).json({error: error.message })
});

router.post('/model/add', (req, res) => {
    
    const _id = req.body.id;
    Car.findOne({ _id }).then(car => {
        
        if (car) {
            let data = {
                'modelName': req.body.modelname,
            };
            
            car.model.push(data);
            let update = {'model': car.model};
            // console.log("model-add-controller", car.model);
            Car.updateOne({_id: _id}, {$set: update}, function(err, result) {
                if (err) {
                    return res.status(400).json({ message: 'Unable to add model.'});

                } else {
                    console.log("success");
                    return res.status(200).json({ message: 'model added successfully. Refreshing data...', success: true });
                }
            });

        } else {
            return res.status(400).json({ message: 'Now not found Reviewdata.'});
        }
    });
});

router.post('/model/update', (req, res) => {
    console.log("model-update-controller", req.body);
    const _id = req.body.id;  
    Car.findOne({ _id }).then(car => {
        if (car?.model?.length > 0) {
            const data = car.model;
            const updatedData = data.map(item => {
                if (item._id == req.body.Model_id) {
                    return { 
                    _id: req.body.Model_id, 
                    modelName: req.body.modelName,
                };
                } else {
                    return item;
                }
            });
            let update = {'model': updatedData};
            Car.updateOne({_id: _id}, {$set: update}, function(err, result) {
                if (err) {
                    return res.status(400).json({ message: 'Unable to update Model.'});

                } else {
                    console.log("success");
                    return res.status(200).json({ message: 'Model updated successfully. Refreshing data...', success: true });
                }
            });
        } else {
            return res.status(400).json({ message: 'Now not found Reviewdata.'});
        }
    })
});

router.post('/model/delete', (req, res) => {
    console.log("model-delete-controller", req.body);
    const _id = req.body.id;  
    Car.findOne({ _id }).then(car => {
        if (car?.model?.length > 0) {
            const updatedData = car.model;
            const matchedIndex = updatedData.findIndex(item => item._id == req.body.Model_id);
            updatedData.splice(matchedIndex, 1);
            let update = {'model': updatedData};
            Car.updateOne({_id: _id}, {$set: update}, function(err, result) {
                if (err) {
                    return res.status(400).json({ message: 'Unable to delete Model.'});

                } else {
                    console.log("success");
                    return res.status(200).json({ message: 'Model delete successfully. Refreshing data...', success: true });
                }
            });
        } else {
            return res.status(400).json({ message: 'Now not found Model.'});
        }
    })
});

router.post('/year/add', (req, res) => {
    console.log("year-add-controller", req.body);
    const _id = req.body.id;
    Car.findOne({ _id }).then(car => {
        if (car?.model) {
            
            let newdata = {
                'date': req.body.date,
            };
            const matchedIndex = car.model.findIndex(item => item._id == req.body.model_id);
            car.model[matchedIndex].year.push(newdata);
            
            let update = {'model': car.model};
            Car.updateOne({_id: _id}, {$set: update}, function(err, result) {
                if (err) {
                    return res.status(400).json({ message: 'Unable to add year.'});

                } else {
                    console.log("success");
                    return res.status(200).json({ message: 'year added successfully. Refreshing data...', success: true });
                }
            });

        } else {
            return res.status(400).json({ message: 'Now not found year.'});
        }
    });
});

router.post('/year/update', (req, res) => {
    console.log("year-update-controller", req.body);
    const _id = req.body.id;  
    Car.findOne({ _id }).then(car => {
        if (car?.model?.length > 0) {
            const matchedModelIndex = car.model.findIndex(item => item._id == req.body.model_id);
            if(car.model[matchedModelIndex].year?.length > 0) {
                const mactchedYearIndex = car.model[matchedModelIndex].year.findIndex(item => item._id == req.body.year_id);
                car.model[matchedModelIndex].year[mactchedYearIndex].date = req.body.date;
                // console.log("data", car.model[matchedModelIndex].year[mactchedYearIndex].date)
                let update = {'model': car.model};
                Car.updateOne({_id: _id}, {$set: update}, function(err, result) {
                    if (err) {
                        return res.status(400).json({ message: 'Unable to update Model.'});

                    } else {
                        console.log("success");
                        return res.status(200).json({ message: 'Model updated successfully. Refreshing data...', success: true });
                    }
                });
            }  else {
                return res.status(400).json({ message: 'Now not found Yeardata.'});
            }                      
        } else {
            return res.status(400).json({ message: 'Now not found Modeldata.'});
        }
    })
});

router.post('/year/delete', (req, res) => {
    console.log("year-delete-controller", req.body);
    const _id = req.body.id;  
    Car.findOne({ _id }).then(car => {
        if (car?.model?.length > 0) {
            const matchedModelIndex = car.model.findIndex(item => item._id == req.body.model_id);
            if(car.model[matchedModelIndex].year?.length > 0) {
                const mactchedYearIndex = car.model[matchedModelIndex].year.findIndex(item => item._id == req.body.year_id);
                car.model[matchedModelIndex].year.splice(mactchedYearIndex, 1);
                let update = {'model': car.model};
                Car.updateOne({_id: _id}, {$set: update}, function(err, result) {
                    if (err) {
                        return res.status(400).json({ message: 'Unable to delete Model.'});

                    } else {
                        console.log("success");
                        return res.status(200).json({ message: 'Model updated successfully. Refreshing data...', success: true });
                    }
                });
            } else {
                return res.status(400).json({ message: 'Now not found Yeardata.'});
            }   
        } else {
            return res.status(400).json({ message: 'Now not found Model.'});
        }
    })
});

router.post('/cylinder/add', (req, res) => {
    console.log("cylinder-add-controller", req.body);
    const _id = req.body.id;
    Car.findOne({ _id }).then(car => {
        if (car?.model) {
            
            const matchedModelIndex = car.model.findIndex(item => item._id == req.body.model_id);
            if(car.model[matchedModelIndex].year?.length > 0) {
                const mactchedYearIndex = car.model[matchedModelIndex].year.findIndex(item => item._id == req.body.year_id);
                let newdata = {
                    'cylinderName': req.body.cylinderName,
                };
                car.model[matchedModelIndex].year[mactchedYearIndex].cylinder.push(newdata);
                let update = {'model': car.model};
                Car.updateOne({_id: _id}, {$set: update}, function(err, result) {
                    if (err) {
                        return res.status(400).json({ message: 'Unable to add cylinder.'});

                    } else {
                        console.log("success");
                        return res.status(200).json({ message: 'cylinder added successfully. Refreshing data...', success: true });
                    }
                });
            } else {
                return res.status(400).json({ message: 'Now not found Yeardata.'});
            }                        
        } else {
            return res.status(400).json({ message: 'Now not found Model.'});
        }
    });
});

router.post('/cylinder/update', (req, res) => {
    console.log("cylinder-update-controller", req.body);
    const _id = req.body.id;
    Car.findOne({ _id }).then(car => {
        if(car?.model) {
            const matchedModelIndex = car.model.findIndex(item => item._id == req.body.model_id);
            if(car.model[matchedModelIndex].year?.length > 0) {
                const mactchedYearIndex = car.model[matchedModelIndex].year.findIndex(item => item._id == req.body.year_id);
                if(car.model[matchedModelIndex].year[mactchedYearIndex].cylinder?.length >0 ) {
                    const machedCylinderIndex = car.model[matchedModelIndex].year[mactchedYearIndex].cylinder.findIndex(item => item._id == req.body.cylinder_id);
                    car.model[matchedModelIndex].year[mactchedYearIndex].cylinder[machedCylinderIndex].cylinderName = req.body.cylinderName;
                    let update = {'model': car.model};
                    Car.updateOne({_id: _id}, {$set: update}, function(err, result) {
                        if (err) {
                            return res.status(400).json({ message: 'Unable to update Model.'});

                        } else {
                            console.log("success");
                            return res.status(200).json({ message: 'Model updated successfully. Refreshing data...', success: true });
                        }
                    });
                } else {
                    return res.status(400).json({ message: 'Now not found Cylinderdata.'});
                }
            } else {
                return res.status(400).json({ message: 'Now not found Yeardata.'});
            }  
        } else {
            return res.status(400).json({ message: 'Now not found Model.'});
        }
    });
});

router.post('/cylinder/delete', (req, res) => {
    console.log("cylinder-update-controller", req.body);
    const _id = req.body.id;
    Car.findOne({ _id }).then(car => {
        if(car?.model) {
            const matchedModelIndex = car.model.findIndex(item => item._id == req.body.model_id);
            if(car.model[matchedModelIndex].year?.length > 0) {
                const mactchedYearIndex = car.model[matchedModelIndex].year.findIndex(item => item._id == req.body.year_id);
                if(car.model[matchedModelIndex].year[mactchedYearIndex].cylinder?.length >0 ) {
                    const machedCylinderIndex = car.model[matchedModelIndex].year[mactchedYearIndex].cylinder.findIndex(item => item._id == req.body.cylinder_id);
                    car.model[matchedModelIndex].year[mactchedYearIndex].cylinder.splice(machedCylinderIndex, 1);
                    let update = {'model': car.model};
                    Car.updateOne({_id: _id}, {$set: update}, function(err, result) {
                        if (err) {
                            return res.status(400).json({ message: 'Unable to update Model.'});

                        } else {
                            console.log("success");
                            return res.status(200).json({ message: 'Model updated successfully. Refreshing data...', success: true });
                        }
                    });
                } else {
                    return res.status(400).json({ message: 'Now not found Cylinderdata.'});
                }
            } else {
                return res.status(400).json({ message: 'Now not found Yeardata.'});
            }  
        } else {
            return res.status(400).json({ message: 'Now not found Model.'});
        }
    });
});

 module.exports = router;