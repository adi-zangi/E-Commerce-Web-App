"use strict";
/**
 * A web service that listens for database requests
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./db"));
const env_json_1 = __importDefault(require("../../client/src/env.json"));
const express_rate_limit_1 = __importStar(require("express-rate-limit"));
const app = (0, express_1.default)();
const serverPort = env_json_1.default.SERVER_PORT || 3001;
const clientPort = env_json_1.default.CLIENT_PORT || 3000;
app.use(express_1.default.json());
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', `http://localhost:${clientPort}`);
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
    next();
});
const loginLimiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // Max 5 login attempts per window
    keyGenerator: (req, res) => {
        const email = req.params.email;
        return email || (0, express_rate_limit_1.ipKeyGenerator)(req.ip + ""); // Fallback to IP
    }
});
// Add a user
app.post('/users/create', (req, res) => {
    db_1.default.addUser(req.body.email, req.body.first_name, req.body.last_name, req.body.password)
        .then((val) => {
        res.status(200).send(val[0]);
    })
        .catch((err) => {
        res.status(500).send(err);
    });
});
// Update the search history table with a given search query
app.post('/search_history/add/:query', (req, res) => {
    db_1.default.updateSearchHistory(req.params.query)
        .then((val) => {
        res.status(200).send(val[0]);
    })
        .catch((err) => {
        res.status(500).send(err);
    });
});
// Check if a user with a given email exists
// Returns a boolean
app.get('/user_exists/:email', (req, res) => {
    db_1.default.isExistingUser(req.params.email)
        .then((val) => {
        res.status(200).send(val);
    })
        .catch((err) => {
        res.status(500).send(err);
    });
});
// Get a user by email
app.get('/users/:email', loginLimiter, (req, res) => {
    db_1.default.getUser(req.params.email)
        .then((val) => {
        res.status(200).send(val[0]);
    })
        .catch((err) => {
        res.status(500).send(err);
    });
});
// Get all products
app.get('/products/sort_by/:sort_option', (req, res) => {
    db_1.default.getAllProducts(req.params.sort_option)
        .then((val) => {
        res.status(200).send(val);
    })
        .catch((err) => {
        res.status(500).send(err);
    });
});
// Get products by a search query
app.get('/products/search/:search_query/sort_by/:sort_option', (req, res) => {
    db_1.default.getProductsByQuery(req.params.search_query, req.params.sort_option)
        .then((val) => {
        res.status(200).send(val);
    })
        .catch((err) => {
        res.status(500).send(err);
    });
});
// Get products by a category
app.get('/products/category/:category_id/sort_by/:sort_option', (req, res) => {
    db_1.default.getProductsByCategory(req.params.category_id, req.params.sort_option)
        .then((val) => {
        res.status(200).send(val);
    })
        .catch((err) => {
        res.status(500).send(err);
    });
});
// Get all categories
app.get('/categories', (req, res) => {
    db_1.default.getAllCategories()
        .then((val) => {
        res.status(200).send(val);
    })
        .catch((err) => {
        res.status(500).send(err);
    });
});
// Get all departments
app.get('/departments', (req, res) => {
    db_1.default.getAllDepartments()
        .then((val) => {
        res.status(200).send(val);
    })
        .catch((err) => {
        res.status(500).send(err);
    });
});
// Get all categories in a department
app.get('/department/:department_id/categories', (req, res) => {
    db_1.default.getCategoriesInDepartment(req.params.department_id)
        .then((val) => {
        res.status(200).send(val);
    })
        .catch((err) => {
        res.status(500).send(err);
    });
});
// Get past search queries that contain a given query
app.get('/search_history/search/:query', (req, res) => {
    db_1.default.getSimilarPastSearches(req.params.query)
        .then((val) => {
        res.status(200).send(val);
    })
        .catch((err) => {
        res.status(500).send(err);
    });
});
app.listen(serverPort, () => {
    console.log(`Listening on port ${serverPort}`);
});
//# sourceMappingURL=index.js.map