const express = require('express');
const router = express.Router();
const Service = require('../../models/Services');

router.post('/get', (req, res) => {
    console.log("services-get-controller");
    Service.find({}).then(service => {
        if (service) {
            return res.status(200).send(service);
        }
    });
});

router.post('/add', (req, res) => {
    console.log("service-add-controller", req.body);
    Service.findOne({ service_type: req.body.service_type }).then(service => {
        if (service) {
            return res.status(400).json({ service: 'This service type already exists' });
        } else {
            const newService = new Service({
                service_type: req.body.service_type,
            });
            newService
                .save()
                .then(service => {
                    return res.status(200).json({message: 'service added successfully. Refreshing data...'})
                }).catch(err => console.log(err));
        }
    });
});

router.post('/update', (req, res) => {
    console.log("service-update-controller", req.body);
    const _id = req.body._id;
    Service.findOne({ _id }).then(service => {
        if (service) {
            
            let update = {'service_type': req.body.service_type};
            Service.update({ _id: _id}, {$set: update}, function(err, result) {
                if (err) {
                    return res.status(400).json({ message: 'Unable to update service.' });
                } else {
                    console.log("success");
                    return res.status(200).json({ message: 'Service updated successfully. Refreshing data...', success: true });
                }
            });
        } else {
            return res.status(400).json({ message: 'Now service found to update.' });
        }
    });
});

router.post('/delete', (req, res) => {
    console.log("service-delete-controller", req.body);
    Service.deleteOne({ _id: req.body._id}).then(car => {
        if (car) {
            return res.status(200).json({message: 'Service deleted successfully. Refreshing data...', success: true})
        }
    });
});

router.post('/data/add', (req, res) => {
    console.log("service-data-add-controller", req.body);
    const _id = req.body.id;
    Service.findOne({ _id }).then(services => {
        if (services) {            
            let adddata = {
                'name': req.body.name,
            };            
            services.data.push(adddata);
            let update = {'data': services.data};
            // console.log("model-add-controller", car.model);
            Service.updateOne({_id: _id}, {$set: update}, function(err, result) {
                if (err) {
                    return res.status(400).json({ message: 'Unable to add data.'});

                } else {
                    console.log("success");
                    return res.status(200).json({ message: 'data added successfully. Refreshing data...', success: true });
                }
            });

        } else {
            return res.status(400).json({ message: 'Now not found Reviewdata.'});
        }
    });
});

router.post('/data/update', (req, res) => {
    console.log("service-data-update-controller", req.body);
    const _id = req.body.id;  
    Service.findOne({ _id }).then(services => {
        if (services?.data?.length > 0) {
            const updatedData = services.data.map(item => {
                if (item._id == req.body.data_id) {
                    return { 
                    _id: req.body.data_id, 
                    name: req.body.name,
                };
                } else {
                    return item;
                }
            });
            let update = {'data': updatedData};
            Service.updateOne({_id: _id}, {$set: update}, function(err, result) {
                if (err) {
                    return res.status(400).json({ message: 'Unable to update data.'});

                } else {
                    console.log("success");
                    return res.status(200).json({ message: 'data updated successfully. Refreshing data...', success: true });
                }
            });
        } else {
            return res.status(400).json({ message: 'Now not found Reviewdata.'});
        }
    })
});

router.post('/data/delete', (req, res) => {
    console.log("service-data-delete-controller", req.body);
    const _id = req.body.id;  
    Service.findOne({ _id }).then(services => {
        if (services?.data?.length > 0) {
            const matchedIndex = services.data.findIndex(item => item._id == req.body.data_id);
            services.data.splice(matchedIndex, 1);
            let update = {'data': services.data};
            Service.updateOne({_id: _id}, {$set: update}, function(err, result) {
                if (err) {
                    return res.status(400).json({ message: 'Unable to delete data.'});

                } else {
                    console.log("success");
                    return res.status(200).json({ message: 'data delete successfully. Refreshing data...', success: true });
                }
            });
        } else {
            return res.status(400).json({ message: 'Now not found Model.'});
        }
    })
});

router.post('/subdata/add', (req, res) => {
    console.log("service-subdata-add-controller", req.body);
    const _id = req.body.id;
    Service.findOne({ _id }).then(services => {
        if (services?.data) {
            
            let newdata = {
                'subname': req.body.subname,
                'price': req.body.price,
                'time': req.body.time,
            };
            const matchedDataIndex = services.data.findIndex(item => item._id == req.body.data_id);
            services.data[matchedDataIndex].subdata.push(newdata);
            
            let update = {'data': services.data};
            Service.updateOne({_id: _id}, {$set: update}, function(err, result) {
                if (err) {
                    return res.status(400).json({ message: 'Unable to add subdata.'});

                } else {
                    console.log("success");
                    return res.status(200).json({ message: 'subdata added successfully. Refreshing data...', success: true });
                }
            });

        } else {
            return res.status(400).json({ message: 'Now not found subdata.'});
        }
    });
});

router.post('/subdata/update', (req, res) => {
    console.log("subdata-update-controller", req.body);
    const _id = req.body.id;  
    Service.findOne({ _id }).then(services => {
        if (services?.data?.length > 0) {
            const matchedDataIndex = services.data.findIndex(item => item._id == req.body.data_id);
            if(services.data[matchedDataIndex].subdata?.length > 0) {
                const mactchedSubdataIndex = services.data[matchedDataIndex].subdata.findIndex(item => item._id == req.body.subdata_id);
                let newData = {
                    'subname': req.body.subname,
                    'price': req.body.price,
                    'time': req.body.time
                };
                services.data[matchedDataIndex].subdata[mactchedSubdataIndex] = newData;
        
                // console.log("data", car.model[matchedModelIndex].year[mactchedYearIndex].date)
                let update = {'data': services.data};
                Service.updateOne({_id: _id}, {$set: update}, function(err, result) {
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

router.post('/subdata/delete', (req, res) => {
    console.log("subdata-delete-controller", req.body);
    const _id = req.body.id;  
    Service.findOne({ _id }).then(services => {
        if (services?.data?.length > 0) {
            const matchedDataIndex = services.data.findIndex(item => item._id == req.body.data_id);
            if(services.data[matchedDataIndex].subdata?.length > 0) {
                const mactchedSubdataIndex = services.data[matchedDataIndex].subdata.findIndex(item => item._id == req.body.subdata_id);
                services.data[matchedDataIndex].subdata.splice(mactchedSubdataIndex, 1);
                let update = {'data': services.data};
                Service.updateOne({_id: _id}, {$set: update}, function(err, result) {
                    if (err) {
                        return res.status(400).json({ message: 'Unable to delete subdata.'});

                    } else {
                        console.log("success");
                        return res.status(200).json({ message: 'subdata updated successfully. Refreshing data...', success: true });
                    }
                });
            } else {
                return res.status(400).json({ message: 'Now not found subdata.'});
            }   
        } else {
            return res.status(400).json({ message: 'Now not found subdata.'});
        }
    })
});

router.post('/servicelist/add', (req, res) => {
    console.log("servicelist-add-controller", req.body);
    const _id = req.body.id;
    Service.findOne({ _id }).then(services => {
        if (services?.data?.length > 0) {
            const matchedDataIndex = services.data.findIndex(item => item._id == req.body.data_id);
            if(services.data[matchedDataIndex].subdata?.length > 0) {
                const mactchedSubdataIndex = services.data[matchedDataIndex].subdata.findIndex(item => item._id == req.body.subdata_id);
                services.data[matchedDataIndex].subdata[mactchedSubdataIndex].service_list.push(req.body.serviceitem);
        
                // console.log("data", car.model[matchedModelIndex].year[mactchedYearIndex].date)
                let update = {'data': services.data};
                Service.updateOne({_id: _id}, {$set: update}, function(err, result) {
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

router.post('/servicelist/update', (req, res) => {
    console.log("servicelist-update-controller", req.body);
    const _id = req.body.id;
    Service.findOne({ _id }).then(services => {
        if (services?.data?.length > 0) {
            const matchedDataIndex = services.data.findIndex(item => item._id == req.body.data_id);
            if(services.data[matchedDataIndex].subdata?.length > 0) {
                const mactchedSubdataIndex = services.data[matchedDataIndex].subdata.findIndex(item => item._id == req.body.subdata_id);
                services.data[matchedDataIndex].subdata[mactchedSubdataIndex].service_list[req.body.servicelist_index] = req.body.servicename;
                let update = {'data': services.data};
                Service.updateOne({_id: _id}, {$set: update}, function(err, result) {
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

router.post('/servicelist/delete', (req, res) => {
    console.log("servicelist-delete-controller", req.body);
    const _id = req.body.id;
    Service.findOne({ _id }).then(services => {
        if (services?.data?.length > 0) {
            const matchedDataIndex = services.data.findIndex(item => item._id == req.body.data_id);
            if(services.data[matchedDataIndex].subdata?.length > 0) {
                const mactchedSubdataIndex = services.data[matchedDataIndex].subdata.findIndex(item => item._id == req.body.subdata_id);
                services.data[matchedDataIndex].subdata[mactchedSubdataIndex].service_list.splice(req.body.servicelist_index, 1);
                let update = {'data': services.data};
                Service.updateOne({_id: _id}, {$set: update}, function(err, result) {
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

module.exports = router;